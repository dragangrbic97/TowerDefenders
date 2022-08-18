const io = require('socket.io')(4444,{})
const Keyv = require('keyv')
import { initRabbitMq } from '../amqp/amqp.connection'
import { getTowerId } from '../db/models/round.repo'


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
    const QUEUE_1 = 'towersQueue';
    const QUEUE_2 = 'maintainerQueue';

    await channel.assertQueue(QUEUE_1, {
        durable: true
    });
    await channel.assertQueue(QUEUE_2, {
        durable: true
    });

    await channel.consume(QUEUE_1, function(msg) {
        console.log(" [x]From pocus Received %s", msg.content.toString());
    }, {
        noAck: true
    });

    socket.on('attack', async (nick: string) => {
        if (!await keyv.get(nick)){
            let messageData = JSON.stringify({'id': enemyTowerId, 'msg':'attack'});
            channel.sendToQueue(QUEUE_1, Buffer.from('attack'));
            channel.sendToQueue(QUEUE_2, Buffer.from(messageData));
            console.log(nick+" attack");
            await keyv.set(nick,1,1000);
        }
    });

    socket.on('defend', async (nick: string) => {
        if (!await keyv.get(nick)){
            let messageData = JSON.stringify({'id': towerId, 'msg':'defend'});
            channel.sendToQueue(QUEUE_1, Buffer.from('defend'));
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