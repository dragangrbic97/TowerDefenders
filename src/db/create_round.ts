import Round = require ('./models/round');
import { createTower } from './create_tower'

export async function createRound() {

    const roundData = {
        id: Math.floor(100000 + Math.random() * 900000),
        time_created: new Date(),
        global_defender_count: 0,
        hocus_tower: await createTower(),
        pocus_tower: await createTower(),
        is_active: true
    }

    try {
        const roundEntry = await Round.create(roundData,{logging: console.log});
        console.log("Round has been created");
        return roundEntry;
    }
    catch (error){
        return console.log(error);
    }
}