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
/**
 * Logger class responsible for handling log messages with different levels and features.
 *
 * @class Logger
 */
declare class Logger {
    private level;
    private appName;
    private timeFormat;
    private messageFormat;
    private levels;
    /**
     * Constructs a Logger instance.
     *
     * @param {string} level - The logging level (debug, info, error).
     * @param {string} [appName] - The name of the application.
     * @param {string} [timeFormat] - The format for the timestamp.
     * @param {Object} [messageFormat] - The prefix and suffix for log messages.
     */
    constructor(level: string, appName?: string, timeFormat?: string, messageFormat?: {
        prefix?: string;
        suffix?: string;
    });
    /**
     * Formats the current timestamp according to the specified time format using date-fns.
     *
     * @returns {string} The formatted timestamp.
     */
    private formatTime;
    /**
     * Formats the log message by adding the specified prefix and suffix.
     *
     * @param {string} message - The log message.
     * @returns {string} The formatted log message.
     */
    private formatMessage;
    /**
     * Logs a message with the specified level and feature.
     *
     * @param {string} level - The logging level (debug, info, error).
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    private log;
    /**
     * Logs an informational message.
     *
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    info(feature: string, message: string): void;
    /**
     * Logs an error message.
     *
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    error(feature: string, message: string): void;
    /**
     * Logs a debug message.
     *
     * @param {string} feature - The feature name associated with the log message.
     * @param {string} message - The log message.
     */
    debug(feature: string, message: string): void;
}
export default Logger;
