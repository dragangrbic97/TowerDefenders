"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createPlayer = void 0;
var Tower = require("./models/tower");
var round_repo_1 = require("./models/round.repo");
var tower_repo_1 = require("./models/tower.repo");
var defender_repo_1 = require("./models/defender.repo");
var Constants_1 = require("../utils/Constants");
var data = {
    towerName: "",
    towerHealth: Constants_1.DEFAULT_TOWER_HEALTH,
    towerDefense: Constants_1.DEFAULT_TOWER_DEFENSE,
    towerDefenders: 0,
    enemyTowerName: "",
    enemyTowerHealth: Constants_1.DEFAULT_TOWER_HEALTH,
    enemyTowerDefenders: Constants_1.DEFAULT_TOWER_DEFENSE,
    defenderReady: false,
    serverUri: ""
};
function createPlayer(nick) {
    return __awaiter(this, void 0, void 0, function () {
        var defenderData, dataValues, hocus, error_1, pocus, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defenderData = {
                        nickname: nick,
                        attack_points_generated: Constants_1.DEFAULT_ATTACK_POINTS_GENERATED,
                        defense_points_generated: Constants_1.DEFAULT_DEFENSE_POINTS_GENERATED,
                        tower: "",
                        tower_id: 0
                    };
                    return [4 /*yield*/, (0, round_repo_1.findRound)(true)];
                case 1:
                    dataValues = _a.sent();
                    if (!(dataValues && dataValues.global_defender_count < Constants_1.MAX_PLAYER_NUMBER)) return [3 /*break*/, 16];
                    return [4 /*yield*/, Tower.findOne({ where: { id: dataValues.hocus_tower }, raw: true })];
                case 2:
                    hocus = (_a.sent());
                    if (!(hocus && hocus.defender_count == 0)) return [3 /*break*/, 8];
                    data.towerName = defenderData.tower = "hocus";
                    data.enemyTowerName = "pocus";
                    data.defenderReady = true;
                    data.serverUri = "ws://localhost:4444";
                    defenderData.tower_id = hocus.id;
                    return [4 /*yield*/, (0, tower_repo_1.updateTower)(dataValues.hocus_tower)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, round_repo_1.updateRound)(dataValues)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, (0, defender_repo_1.createDefender)(defenderData)];
                case 6:
                    _a.sent();
                    console.log("New player with nickname \"" + nick + "\" created");
                    return [2 /*return*/, data];
                case 7:
                    error_1 = _a.sent();
                    return [2 /*return*/, console.log(error_1)];
                case 8: return [4 /*yield*/, Tower.findOne({ where: { id: dataValues.pocus_tower }, raw: true })];
                case 9:
                    pocus = (_a.sent());
                    if (!(pocus && pocus.defender_count == 0)) return [3 /*break*/, 15];
                    data.towerName = defenderData.tower = "pocus";
                    data.enemyTowerName = "hocus";
                    data.defenderReady = true;
                    data.serverUri = "ws://localhost:5555";
                    defenderData.tower_id = pocus.id;
                    return [4 /*yield*/, (0, tower_repo_1.updateTower)(dataValues.pocus_tower)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, (0, round_repo_1.updateRound)(dataValues)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, (0, defender_repo_1.createDefender)(defenderData)];
                case 13:
                    _a.sent();
                    console.log("New player with nickname \"" + nick + "\" created");
                    return [2 /*return*/, data];
                case 14:
                    error_2 = _a.sent();
                    return [2 /*return*/, console.log(error_2)];
                case 15: return [3 /*break*/, 17];
                case 16:
                    console.log("Round have MAX number of players");
                    _a.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.createPlayer = createPlayer;
