const network = require('os')

export const DEFAULT_TOWER_HEALTH = 5000
export const DEFAULT_TOWER_DEFENSE = 0
export const DEFAULT_ATTACK_POINTS_GENERATED = 0
export const DEFAULT_DEFENSE_POINTS_GENERATED = 0

export type TOWER = {
    id: number,
    health: number,
    defense: number,
    defender_count: number
}

export const WEBSOCKET_BASE_URL ='ws://'+network.networkInterfaces()['wlp1s0'][0].address+':'
export const DEFAULT_HOCUS_PORT = 4444
export const DEFAULT_POCUS_PORT = 5555