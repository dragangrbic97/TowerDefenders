import Round = require ('./round')
import { Sequelize } from 'sequelize'

export async function updateRound(dataValues: any) {
    await Round.update({ global_defender_count: Sequelize.literal('global_defender_count+1') }, { where: { id: dataValues.id } })
}

export async function findRound(key: boolean) {
    const dataValues = await Round.findOne({ where: { is_active: key}, raw:true });
    return dataValues;
}

export async function getTowerId(name: string) {
    if (name === 'hocus'){
        const dataValues=await findRound(true);
        const {hocus_tower}=dataValues;
        return hocus_tower;
    }
    if (name === 'pocus'){
        const dataValues=await findRound(true);
        const {pocus_tower}=dataValues;
        return pocus_tower;
    }
}