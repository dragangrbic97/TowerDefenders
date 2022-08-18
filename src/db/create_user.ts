import Tower = require('./models/tower');
import { findRound, updateRound } from './models/round.repo'
import { updateTowerIncremental, updateTowerHealthPoints } from './models/tower.repo'
import { createDefender } from './models/defender.repo'
import {
    DEFAULT_ATTACK_POINTS_GENERATED, DEFAULT_DEFENSE_POINTS_GENERATED,
    DEFAULT_TOWER_DEFENSE, DEFAULT_TOWER_HEALTH, DEFAULT_HOCUS_PORT,
    DEFAULT_POCUS_PORT, WEBSOCKET_BASE_URL, TOWER
} from '../utils/Constants'

const data = {
    defenderId: 0,
    towerName: "",
    towerHealth: DEFAULT_TOWER_HEALTH,
    towerDefense: DEFAULT_TOWER_DEFENSE,
    towerDefenders: 0,
    enemyTowerName: "",
    enemyTowerHealth: DEFAULT_TOWER_HEALTH,
    enemyTowerDefenders: DEFAULT_TOWER_DEFENSE,
    defenderReady: false,
    serverUri: ""
}

async function writeData(dataValues: any) {
    await updateTowerHealthPoints(dataValues.hocus_tower, 1000);
    await updateTowerHealthPoints(dataValues.pocus_tower, 1000);
    await updateRound(dataValues);
}

export async function createPlayer(nick: string) {

    const defenderData = {
        id: Math.floor(100000 + Math.random() * 900000),
        nickname: nick,
        attack_points_generated: DEFAULT_ATTACK_POINTS_GENERATED,
        defense_points_generated: DEFAULT_DEFENSE_POINTS_GENERATED,
        tower: "",
        tower_id: 0
    }

    const dataValues = await findRound(true)

    if (dataValues) {

        const hocus = (await Tower.findOne({ where: { id: dataValues.hocus_tower }, raw: true})) as TOWER | null
        const pocus = (await Tower.findOne({ where: { id: dataValues.pocus_tower }, raw: true})) as TOWER | null
        if (hocus && pocus && (hocus.defender_count <= pocus.defender_count)) {
            data.defenderId = defenderData.id;
            data.towerName = defenderData.tower = "hocus";
            data.enemyTowerName = "pocus";
            data.defenderReady = true;
            data.serverUri=(WEBSOCKET_BASE_URL+DEFAULT_HOCUS_PORT);
            defenderData.tower_id = hocus.id;
            await updateTowerIncremental(dataValues.hocus_tower);
            await writeData(dataValues);
            try {
                await createDefender(defenderData);
                console.log("New player with nickname \"" + nick + "\" created");
                return data;
            } catch (error) {
                return console.log(error);
            }
        }

        if (hocus && pocus && (hocus.defender_count > pocus.defender_count)) {
            data.defenderId = defenderData.id;
            data.towerName = defenderData.tower = "pocus";
            data.enemyTowerName = "hocus";
            data.defenderReady = true;
            data.serverUri=(WEBSOCKET_BASE_URL+DEFAULT_POCUS_PORT);
            defenderData.tower_id = pocus.id;
            await updateTowerIncremental(dataValues.pocus_tower);
            await writeData(dataValues);
            try {
                await createDefender(defenderData);
                console.log("New player with nickname \"" + nick + "\" created");
                return data;
            } catch (error) {
                return console.log(error);
            }
        }
    } else {
        console.log("ERROR occurred! There is no active round.");
    }
}