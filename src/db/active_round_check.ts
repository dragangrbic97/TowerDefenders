import Round = require ('./models/round');

export async function checkRounds() {
    try {
        const {dataValues} = await Round.findOne({ where: { is_active: true } });
        return true;
    }
    catch (e) {
        return false;
    }
}