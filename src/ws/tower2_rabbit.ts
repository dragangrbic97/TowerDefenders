const io = require('socket.io')(5555,{})
const Keyv = require('keyv')
import { initRabbitMq } from '../amqp/amqp.connection'
import { getTowerId } from '../db/models/round.repo'
import { getTowerData } from '../db/models/tower.repo'


const defenders: string[] = [];
const keyv = new Keyv();
let towerId: number;
let enemyTowerId: number;
(async () => towerId = await getTowerId('pocus'))();
(async () => enemyTowerId = await getTowerId('hocus'))();

io.on('connection', async (socket: any) => {
    console.log(socket.id);

    socket.on('player_connected', (nick: string) =>{
        console.log(nick);
        defenders.push(nick);
        console.log(defenders);
    })

    let channel = await initRabbitMq();
    const QUEUE_3 = 'towersQueue2';
    const QUEUE_2 = 'maintainerQueue';

    await channel.assertQueue(QUEUE_3, {
        durable: true
    });
    await channel.assertQueue(QUEUE_2, {
        durable: true
    });

    await channel.consume(QUEUE_3, async function(msg) {
        if (msg.content.toString()=='update') {
            let towerData = await getTowerData(towerId);
            let enemyTowerData = await getTowerData(enemyTowerId);
            const data = {
                towerHealth: towerData.health,
                towerDefense: towerData.defense,
                towerDefenders: towerData.defender_count,

                enemyTowerHealth: enemyTowerData.health,
                enemyTowerDefenders: enemyTowerData.defender_count
            }
            if (data.towerHealth<=0) {
                data.towerHealth=0;
                socket.emit('updatePocusTowerData', data);
                socket.emit('gameOver',"LOST");
            }
            if (data.enemyTowerHealth<=0) {
                data.enemyTowerHealth=0;
                socket.emit('updatePocusTowerData', data);
                socket.emit('gameOver',"WON" );
            }
            socket.emit('updatePocusTowerData', data);
        }
    }, {
        noAck: true
    });

    socket.on('attack', async (nick: string) => {
        if (!await keyv.get(nick)){
            let messageData = JSON.stringify({'id': enemyTowerId, 'msg':'attack'});
            channel.sendToQueue(QUEUE_2, Buffer.from(messageData));
            console.log(nick+" attack");
            await keyv.set(nick,1,1000);

        }
    });

    socket.on('defend', async (nick: string) => {
        if (!await keyv.get(nick)){
            let messageData = JSON.stringify({'id': towerId, 'msg':'defend'});
            channel.sendToQueue(QUEUE_2, Buffer.from(messageData));
            console.log(nick+" defend");
            await keyv.set(nick,1,2000);
        }
    });

    socket.on('player_disconnected', (nick: string) => {
        for(let i = 0; i < defenders.length; i++){

            if ( defenders[i] === nick) {
                defenders.splice(i, 1);
            }

        }
        let messageData = JSON.stringify({'id': towerId, 'msg':'player_disconnected'});
        channel.sendToQueue(QUEUE_2, Buffer.from(messageData));
        console.log("USER disconnected: ", nick);
    });
});