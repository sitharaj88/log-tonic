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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
var logger_1 = __importDefault(require("./logger"));
/**
 * LoggerFactory class responsible for creating and managing Logger instances.
 *
 * @class LoggerFactory
 */
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    /**
     * Initializes the logger with the provided configuration.
     *
     * @param {LoggerConfig} config - The configuration for the logger.
     * @returns {Logger} The initialized Logger instance.
     */
    LoggerFactory.initialize = function (config) {
        if (!LoggerFactory.loggerInstance) {
            LoggerFactory.loggerInstance = new logger_1.default(config.level, config.appName, config.timeFormat, config.messageFormat);
        }
        return LoggerFactory.loggerInstance;
    };
    /**
     * Creates a logger for the specified feature.
     *
     * @param {string} feature - The feature name for which to create the logger.
     * @returns {Object} An object containing methods for logging info, error, and debug messages.
     */
    LoggerFactory.createLogger = function (feature) {
        if (!LoggerFactory.loggerInstance) {
            throw new Error("Logger is not initialized. Call LoggerFactory.initialize(config) first.");
        }
        return {
            info: function (message) {
                return LoggerFactory.loggerInstance.info(feature, message);
            },
            error: function (message) {
                return LoggerFactory.loggerInstance.error(feature, message);
            },
            debug: function (message) {
                return LoggerFactory.loggerInstance.debug(feature, message);
            },
        };
    };
    LoggerFactory.loggerInstance = null;
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
