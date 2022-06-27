import Defender = require ('./defender')

export async function createDefender(defenderData: { tower_id: number; attack_points_generated: number; nickname: string; defense_points_generated: number; tower: string }) {
    await Defender.create(defenderData, { logging: console.log })
}