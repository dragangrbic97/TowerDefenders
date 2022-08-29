const io = require('socket.io')(4444,{})
const Keyv = require('keyv')
import { initRabbitMq } from '../amqp/amqp.connection'
import { getTowerId } from '../db/models/round.repo'
import { getTowerData } from '../db/models/tower.repo'


const defenders: string[] = [];
const keyv = new Keyv();
let towerId: number;
let enemyTowerId: number;
(async () => towerId = await getTowerId('hocus'))();
(async () => enemyTowerId = await getTowerId('pocus'))();

io.on('connection', async (socket: any) => {
    console.log(socket.id);

    socket.on('player_connected', (nick: string) =>{
        console.log(nick);
        defenders.push(nick);
        console.log(defenders);
    })

    let channel = await initRabbitMq();
    const QUEUE_1 = 'towersQueue1';
    const QUEUE_2 = 'maintainerQueue';

    await channel.assertQueue(QUEUE_1, {
        durable: true
    });
    await channel.assertQueue(QUEUE_2, {
        durable: true
    });

    await channel.consume(QUEUE_1, async function(msg) {
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
                socket.emit('updateHocusTowerData', data);
                socket.emit('gameOver',"LOST");
            }
            if (data.enemyTowerHealth<=0) {
                data.enemyTowerHealth=0;
                socket.emit('updateHocusTowerData', data);
                socket.emit('gameOver',"WON" );
            }
            socket.emit('updateHocusTowerData', data);
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