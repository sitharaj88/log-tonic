"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTransport = void 0;
var types_1 = require("./types");
var ConsoleTransport = /** @class */ (function () {
    function ConsoleTransport(options) {
        if (options === void 0) { options = {}; }
        this.useJson = options.useJson || false;
        this.useColor = options.useColor !== false; // Default to true
    }
    ConsoleTransport.prototype.getColor = function (level) {
        if (!this.useColor)
            return '';
        switch (level) {
            case types_1.LogLevel.DEBUG: return '\x1b[34m'; // Blue
            case types_1.LogLevel.INFO: return '\x1b[32m'; // Green
            case types_1.LogLevel.WARN: return '\x1b[33m'; // Yellow
            case types_1.LogLevel.ERROR: return '\x1b[31m'; // Red
            case types_1.LogLevel.FATAL: return '\x1b[35m'; // Magenta
            default: return '\x1b[37m'; // White
        }
    };
    ConsoleTransport.prototype.getReset = function () {
        return this.useColor ? '\x1b[0m' : '';
    };
    ConsoleTransport.prototype.log = function (entry) {
        if (this.useJson) {
            console.log(JSON.stringify(entry));
            return;
        }
        var color = this.getColor(entry.level);
        var reset = this.getReset();
        var metaStr = entry.meta && Object.keys(entry.meta).length > 0
            ? " ".concat(JSON.stringify(entry.meta))
            : '';
        var featureStr = entry.feature ? " [".concat(entry.feature, "]") : '';
        console.log("".concat(entry.timestamp, " [").concat(entry.appName, "]").concat(featureStr, " ").concat(color).concat(entry.level.toUpperCase()).concat(reset, ": ").concat(entry.message).concat(metaStr));
    };
    return ConsoleTransport;
}());
exports.ConsoleTransport = ConsoleTransport;
