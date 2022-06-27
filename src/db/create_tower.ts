import Tower = require('./models/tower');
import { DEFAULT_TOWER_DEFENSE, DEFAULT_TOWER_HEALTH } from '../utils/Constants'

export async function createTower() {

    const towerData = {
        id: Math.floor(1000 + Math.random() * 9000),
        health: DEFAULT_TOWER_HEALTH,
        defense: DEFAULT_TOWER_DEFENSE,
        defender_count: 0
    }

    try {
        const towerEntry = await Tower.create(towerData,{logging: console.log}) as any;
        console.log("Tower has been created");
        const {dataValues}=towerEntry;
        const {id}=dataValues;
        return id;
    }
    catch (error){
        return console.log(error);
    }
}