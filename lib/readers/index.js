"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const wmass_1 = require("./wmass");
tslib_1.__exportStar(require("./wmass"), exports);
function readOutputs(params) {
    const { dir } = params;
    wmass_1.readWmassOutput(dir);
}
exports.readOutputs = readOutputs;
