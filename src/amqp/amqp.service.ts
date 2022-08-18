import { initRabbitMq } from '../amqp/amqp.connection'
import {
    getTowerDefensePoints,
    getTowerHealthPoints,
    updateTowerDecremental,
    updateTowerDefensePoints,
    updateTowerHealthPoints
} from '../db/models/tower.repo'

(async () => {
    let channel = await initRabbitMq()
    const QUEUE_2 = 'maintainerQueue'

    await channel.assertQueue(QUEUE_2, {
        durable: true
    })

    await channel.consume(QUEUE_2, async function(msg) {
        let message = JSON.parse(msg.content.toString());
        if (message.msg === 'player_disconnected'){
            await updateTowerDecremental(message.id);
            let points=await getTowerHealthPoints(message.id);
            if (points >= 500){
                await updateTowerHealthPoints(message.id,-500); }
        }
        if (message.msg === 'attack'){
            let defense_points=await getTowerDefensePoints(message.id);
            if (defense_points >= 100){
                await updateTowerDefensePoints(message.id, -100);
            }
            else{
                let point_difference=defense_points-100;
                await updateTowerHealthPoints(message.id, point_difference);
                await updateTowerDefensePoints(message.id, -100-point_difference);
            }
        }
        if (message.msg === 'defend'){
            await updateTowerDefensePoints(message.id,150);
        }
    }, {
        noAck: true
    });
})()


