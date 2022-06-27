import Tower = require ('./tower')

export async function updateTower(id: number) {
    await Tower.update({ defender_count: 1 }, { where: { id: id } })
}