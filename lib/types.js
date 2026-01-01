"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevelPriority = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
    LogLevel["FATAL"] = "fatal";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
exports.LogLevelPriority = (_a = {},
    _a[LogLevel.DEBUG] = 0,
    _a[LogLevel.INFO] = 1,
    _a[LogLevel.WARN] = 2,
    _a[LogLevel.ERROR] = 3,
    _a[LogLevel.FATAL] = 4,
    _a);
