import Tower = require('./models/tower');
import { findRound, updateRound } from './models/round.repo'
import { updateTower } from './models/tower.repo'
import { createDefender } from './models/defender.repo'
import {
    DEFAULT_ATTACK_POINTS_GENERATED, DEFAULT_DEFENSE_POINTS_GENERATED,
    DEFAULT_TOWER_DEFENSE, DEFAULT_TOWER_HEALTH, MAX_PLAYER_NUMBER,
    TOWER
} from '../utils/Constants'

const data = {
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

export async function createPlayer(nick: string) {

    const defenderData = {
        nickname: nick,
        attack_points_generated: DEFAULT_ATTACK_POINTS_GENERATED,
        defense_points_generated: DEFAULT_DEFENSE_POINTS_GENERATED,
        tower: "",
        tower_id: 0
    }

    const dataValues = await findRound(true)

    if (dataValues && dataValues.global_defender_count < MAX_PLAYER_NUMBER) {

        const hocus = (await Tower.findOne({ where: { id: dataValues.hocus_tower }, raw: true})) as TOWER | null
        if (hocus && hocus.defender_count == 0) {
            data.towerName = defenderData.tower = "hocus";
            data.enemyTowerName = "pocus";
            data.defenderReady = true;
            data.serverUri="ws://localhost:4444";
            defenderData.tower_id = hocus.id;
            await updateTower(dataValues.hocus_tower);
            await updateRound(dataValues);
            try {
                await createDefender(defenderData);
                console.log("New player with nickname \"" + nick + "\" created");
                return data;
            } catch (error) {
                return console.log(error);
            }
        }

        const pocus = (await Tower.findOne({ where: { id: dataValues.pocus_tower } , raw: true})) as TOWER | null
        if (pocus && pocus.defender_count == 0) {
            data.towerName = defenderData.tower = "pocus";
            data.enemyTowerName = "hocus";
            data.defenderReady = true;
            data.serverUri="ws://localhost:5555";
            defenderData.tower_id = pocus.id;
            await updateTower(dataValues.pocus_tower);
            await updateRound(dataValues);

            try {
                await createDefender(defenderData);
                console.log("New player with nickname \"" + nick + "\" created");
                return data;
            } catch (error) {
                return console.log(error);
            }
        }
    } else {
        console.log("Round have MAX number of players");
    }
}