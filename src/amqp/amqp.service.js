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
var amqp_connection_1 = require("../amqp/amqp.connection");
var tower_repo_1 = require("../db/models/tower.repo");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var channel, QUEUE_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, amqp_connection_1.initRabbitMq)()];
            case 1:
                channel = _a.sent();
                QUEUE_2 = 'maintainerQueue';
                return [4 /*yield*/, channel.assertQueue(QUEUE_2, {
                        durable: true
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, channel.consume(QUEUE_2, function (msg) {
                        return __awaiter(this, void 0, void 0, function () {
                            var message, points, defense_points, point_difference;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        message = JSON.parse(msg.content.toString());
                                        if (!(message.msg === 'player_disconnected')) return [3 /*break*/, 4];
                                        return [4 /*yield*/, (0, tower_repo_1.updateTowerDecremental)(message.id)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, (0, tower_repo_1.getTowerHealthPoints)(message.id)];
                                    case 2:
                                        points = _a.sent();
                                        if (!(points >= 500)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, (0, tower_repo_1.updateTowerHealthPoints)(message.id, -500)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        if (!(message.msg === 'attack')) return [3 /*break*/, 10];
                                        return [4 /*yield*/, (0, tower_repo_1.getTowerDefensePoints)(message.id)];
                                    case 5:
                                        defense_points = _a.sent();
                                        if (!(defense_points >= 100)) return [3 /*break*/, 7];
                                        return [4 /*yield*/, (0, tower_repo_1.updateTowerDefensePoints)(message.id, -100)];
                                    case 6:
                                        _a.sent();
                                        return [3 /*break*/, 10];
                                    case 7:
                                        point_difference = defense_points - 100;
                                        return [4 /*yield*/, (0, tower_repo_1.updateTowerHealthPoints)(message.id, point_difference)];
                                    case 8:
                                        _a.sent();
                                        return [4 /*yield*/, (0, tower_repo_1.updateTowerDefensePoints)(message.id, -100 - point_difference)];
                                    case 9:
                                        _a.sent();
                                        _a.label = 10;
                                    case 10:
                                        if (!(message.msg === 'defend')) return [3 /*break*/, 12];
                                        return [4 /*yield*/, (0, tower_repo_1.updateTowerDefensePoints)(message.id, 150)];
                                    case 11:
                                        _a.sent();
                                        _a.label = 12;
                                    case 12: return [2 /*return*/];
                                }
                            });
                        });
                    }, {
                        noAck: true
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
