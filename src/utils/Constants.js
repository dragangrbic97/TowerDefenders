"use strict";
exports.__esModule = true;
exports.DEFAULT_POCUS_PORT = exports.DEFAULT_HOCUS_PORT = exports.WEBSOCKET_BASE_URL = exports.DEFAULT_DEFENSE_POINTS_GENERATED = exports.DEFAULT_ATTACK_POINTS_GENERATED = exports.DEFAULT_TOWER_DEFENSE = exports.DEFAULT_TOWER_HEALTH = void 0;
var network = require('os');
exports.DEFAULT_TOWER_HEALTH = 5000;
exports.DEFAULT_TOWER_DEFENSE = 0;
exports.DEFAULT_ATTACK_POINTS_GENERATED = 0;
exports.DEFAULT_DEFENSE_POINTS_GENERATED = 0;
exports.WEBSOCKET_BASE_URL = 'ws://' + network.networkInterfaces()['wlp1s0'][0].address + ':';
exports.DEFAULT_HOCUS_PORT = 4444;
exports.DEFAULT_POCUS_PORT = 5555;
