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
/**
 * Logger class responsible for handling log messages with different levels and features.
 *
 * @class Logger
 */
var Logger = /** @class */ (function () {
    /**
     * Constructs a Logger instance.
     *
     * @param {string} level - The logging level (debug, info, error).
     * @param {string} [appName] - The name of the application.
     * @param {string} [timeFormat] - The format for the timestamp.
     * @param {Object} [messageFormat] - The prefix and suffix for log messages.
     */
    function Logger(level, appName, timeFormat, messageFormat) {
        this.level = level;
        this.appName = appName || "MyApp";
        this.timeFormat = timeFormat || "YYYY-MM-DD HH:mm:ss";
        this.messageFormat = messageFormat || null;
        this.levels = { debug: 0, info: 1, error: 2 };
    }
    /**
     * Formats the current timestamp according to the specified time format using date-fns.
     *
     * @returns {string} The formatted timestamp.
     */
    Logger.prototype.formatTime = function () {
        var now = new Date();
        try {
            return (0, date_fns_1.format)(now, this.timeFormat);
        }
        catch (error) {
            console.warn("Invalid time format provided: ".concat(this.timeFormat, ". Falling back to default ISO format."));
            return now.toISOString().replace("T", " ").split(".")[0]; // Fallback to ISO format
        }
    };
    /**
     * Formats the log message by adding the specified prefix and suffix.
     *
     * @param {string} message - The log message.
     * @returns {string} The formatted log message.
     */
    Logger.prototype.formatMessage = function (message) {
        if (this.messageFormat) {
            return "".concat(this.messageFormat.prefix || "").concat(message).concat(this.messageFormat.suffix || "");
        }
        return message;
    };
    /**
     * Logs a message with the specified level and feature.
     *
     * @param {string} level - The logging level (debug, info, error).
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    Logger.prototype.log = function (level, feature, message) {
        if (this.levels[level] >= this.levels[this.level]) {
            var timestamp = this.formatTime();
            var formattedMessage = this.formatMessage(message);
            console.log("".concat(timestamp, " [").concat(this.appName, "] [").concat(feature, "] ").concat(level.toUpperCase(), ": ").concat(formattedMessage));
        }
    };
    /**
     * Logs an informational message.
     *
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    Logger.prototype.info = function (feature, message) {
        this.log("info", feature, message);
    };
    /**
     * Logs an error message.
     *
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    Logger.prototype.error = function (feature, message) {
        this.log("error", feature, message);
    };
    /**
     * Logs a debug message.
     *
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    Logger.prototype.debug = function (feature, message) {
        this.log("debug", feature, message);
    };
    return Logger;
}());
exports.default = Logger;
