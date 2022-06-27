import Round = require ('./round')
import { sequelize } from '../db_connect'

export async function updateRound(dataValues: any) {
    await Round.update({ global_defender_count: sequelize.literal('global_defender_count+1') }, { where: { id: dataValues.id } })
}

export async function findRound(key: boolean) {
    const dataValues = await Round.findOne({ where: { is_active: key}, raw:true });
    return dataValues;
}