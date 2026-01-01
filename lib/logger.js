"use strict";
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2024 Sitharaj Seenivasan
 */
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var types_1 = require("./types");
var transports_1 = require("./transports");
/**
 * Enterprise-grade Logger class.
 * Supports multiple transports, structured logging, and configurable formatting.
 *
 * @class Logger
 */
var Logger = /** @class */ (function () {
    /**
     * Constructs a Logger instance.
     *
     * @param {LoggerConfig} config - Configuration object.
     */
    function Logger(config) {
        this.config = config;
        this.transports = config.transports && config.transports.length > 0
            ? config.transports
            : [new transports_1.ConsoleTransport()];
    }
    Logger.prototype.formatTime = function () {
        var now = new Date();
        try {
            return (0, date_fns_1.format)(now, this.config.timeFormat || "yyyy-MM-dd HH:mm:ss");
        }
        catch (error) {
            return now.toISOString();
        }
    };
    Logger.prototype.formatMessage = function (message) {
        var _a = this.config.messageFormat || {}, prefix = _a.prefix, suffix = _a.suffix;
        return "".concat(prefix || "").concat(message).concat(suffix || "");
    };
    Logger.prototype.log = function (level, feature, message, meta) {
        if (types_1.LogLevelPriority[level] < types_1.LogLevelPriority[this.config.minLevel]) {
            return;
        }
        var entry = {
            timestamp: this.formatTime(),
            level: level,
            appName: this.config.appName || "MyApp",
            feature: feature,
            message: this.formatMessage(message),
            meta: meta,
        };
        for (var _i = 0, _a = this.transports; _i < _a.length; _i++) {
            var transport = _a[_i];
            try {
                transport.log(entry);
            }
            catch (e) {
                console.error("Failed to log to transport:", e);
            }
        }
    };
    Logger.prototype.debug = function (feature, message, meta) {
        this.log(types_1.LogLevel.DEBUG, feature, message, meta);
    };
    Logger.prototype.info = function (feature, message, meta) {
        this.log(types_1.LogLevel.INFO, feature, message, meta);
    };
    Logger.prototype.warn = function (feature, message, meta) {
        this.log(types_1.LogLevel.WARN, feature, message, meta);
    };
    Logger.prototype.error = function (feature, message, meta) {
        this.log(types_1.LogLevel.ERROR, feature, message, meta);
    };
    Logger.prototype.fatal = function (feature, message, meta) {
        this.log(types_1.LogLevel.FATAL, feature, message, meta);
    };
    return Logger;
}());
exports.default = Logger;
