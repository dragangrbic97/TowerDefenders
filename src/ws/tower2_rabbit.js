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
var io = require('socket.io')(5555, {});
var Keyv = require('keyv');
var amqp_connection_1 = require("../amqp/amqp.connection");
var round_repo_1 = require("../db/models/round.repo");
var tower_repo_1 = require("../db/models/tower.repo");
var defenders = [];
var keyv = new Keyv();
var towerId;
var enemyTowerId;
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, round_repo_1.getTowerId)('pocus')];
        case 1: return [2 /*return*/, towerId = _a.sent()];
    }
}); }); })();
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, round_repo_1.getTowerId)('hocus')];
        case 1: return [2 /*return*/, enemyTowerId = _a.sent()];
    }
}); }); })();
io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var channel, QUEUE_3, QUEUE_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(socket.id);
                socket.on('player_connected', function (nick) {
                    console.log(nick);
                    defenders.push(nick);
                    console.log(defenders);
                });
                return [4 /*yield*/, (0, amqp_connection_1.initRabbitMq)()];
            case 1:
                channel = _a.sent();
                QUEUE_3 = 'towersQueue2';
                QUEUE_2 = 'maintainerQueue';
                return [4 /*yield*/, channel.assertQueue(QUEUE_3, {
                        durable: true
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, channel.assertQueue(QUEUE_2, {
                        durable: true
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, channel.consume(QUEUE_3, function (msg) {
                        return __awaiter(this, void 0, void 0, function () {
                            var towerData, enemyTowerData, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(msg.content.toString() == 'update')) return [3 /*break*/, 3];
                                        return [4 /*yield*/, (0, tower_repo_1.getTowerData)(towerId)];
                                    case 1:
                                        towerData = _a.sent();
                                        return [4 /*yield*/, (0, tower_repo_1.getTowerData)(enemyTowerId)];
                                    case 2:
                                        enemyTowerData = _a.sent();
                                        data = {
                                            towerHealth: towerData.health,
                                            towerDefense: towerData.defense,
                                            towerDefenders: towerData.defender_count,
                                            enemyTowerHealth: enemyTowerData.health,
                                            enemyTowerDefenders: enemyTowerData.defender_count
                                        };
                                        if (data.towerHealth <= 0) {
                                            data.towerHealth = 0;
                                            socket.emit('updatePocusTowerData', data);
                                            socket.emit('gameOver', "LOST");
                                        }
                                        if (data.enemyTowerHealth <= 0) {
                                            data.enemyTowerHealth = 0;
                                            socket.emit('updatePocusTowerData', data);
                                            socket.emit('gameOver', "WON");
                                        }
                                        socket.emit('updatePocusTowerData', data);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    }, {
                        noAck: true
                    })];
            case 4:
                _a.sent();
                socket.on('attack', function (nick) { return __awaiter(void 0, void 0, void 0, function () {
                    var messageData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, keyv.get(nick)];
                            case 1:
                                if (!!(_a.sent())) return [3 /*break*/, 3];
                                messageData = JSON.stringify({ 'id': enemyTowerId, 'msg': 'attack' });
                                channel.sendToQueue(QUEUE_2, Buffer.from(messageData));
                                console.log(nick + " attack");
                                return [4 /*yield*/, keyv.set(nick, 1, 1000)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('defend', function (nick) { return __awaiter(void 0, void 0, void 0, function () {
                    var messageData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, keyv.get(nick)];
                            case 1:
                                if (!!(_a.sent())) return [3 /*break*/, 3];
                                messageData = JSON.stringify({ 'id': towerId, 'msg': 'defend' });
                                channel.sendToQueue(QUEUE_2, Buffer.from(messageData));
                                console.log(nick + " defend");
                                return [4 /*yield*/, keyv.set(nick, 1, 2000)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('player_disconnected', function (nick) {
                    for (var i = 0; i < defenders.length; i++) {
                        if (defenders[i] === nick) {
                            defenders.splice(i, 1);
                        }
                    }
                    var messageData = JSON.stringify({ 'id': towerId, 'msg': 'player_disconnected' });
                    channel.sendToQueue(QUEUE_2, Buffer.from(messageData));
                    console.log("USER disconnected: ", nick);
                });
                return [2 /*return*/];
        }
    });
}); });
