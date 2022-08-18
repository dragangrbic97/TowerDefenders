import Tower = require ('./tower')
import { sequelize } from '../db_connect'

export async function updateTowerIncremental(id: number) {
    await Tower.update({ defender_count: sequelize.literal('defender_count+1')}, { where: { id: id } })
}

export async function updateTowerDecremental(id: number) {
    await Tower.update({ defender_count: sequelize.literal('defender_count-1')}, { where: { id: id } })
}

export async function updateTowerHealthPoints(id: number, points: number) {
    await Tower.update({ health: sequelize.literal(`health+${points}`)}, {where: { id: id }})
}

export async function updateTowerDefensePoints(id: number, points: number) {
    await Tower.update({ defense: sequelize.literal(`defense+${points}`)}, {where: { id: id }})
}

export async function getTowerHealthPoints(id: number) {
    const dataValues = await Tower.findOne({ where: { id: id}, raw:true });
    const {health} = dataValues;
    return health;
}

export async function getTowerDefensePoints(id: number) {
    const dataValues = await Tower.findOne({ where: { id: id}, raw:true });
    const {defense} = dataValues;
    return defense;
}
