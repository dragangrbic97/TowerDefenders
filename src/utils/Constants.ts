export const DEFAULT_TOWER_HEALTH = 5000
export const DEFAULT_TOWER_DEFENSE = 2000
export const MAX_PLAYER_NUMBER = 2
export const DEFAULT_ATTACK_POINTS_GENERATED = 0
export const DEFAULT_DEFENSE_POINTS_GENERATED = 0

export type TOWER = {
    id: number,
    health: number,
    defense: number,
    defender_count: number
}