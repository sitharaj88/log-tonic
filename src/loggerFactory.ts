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

import Logger from "./logger";

/**
 * Interface representing the configuration options for the Logger.
 */
export interface LoggerConfig {
  level: "debug" | "info" | "error";
  appName?: string;
  timeFormat?: string;
  messageFormat?: { prefix?: string; suffix?: string };
}

/**
 * LoggerFactory class responsible for creating and managing Logger instances.
 *
 * @class LoggerFactory
 */
export class LoggerFactory {
  private static loggerInstance: Logger | null = null;

  /**
   * Initializes the logger with the provided configuration.
   *
   * @param {LoggerConfig} config - The configuration for the logger.
   * @returns {Logger} The initialized Logger instance.
   */
  public static initialize(config: LoggerConfig): Logger {
    if (!LoggerFactory.loggerInstance) {
      LoggerFactory.loggerInstance = new Logger(
        config.level,
        config.appName,
        config.timeFormat,
        config.messageFormat
      );
    }
    return LoggerFactory.loggerInstance;
  }

  /**
   * Creates a logger for the specified feature.
   *
   * @param {string} feature - The feature name for which to create the logger.
   * @returns {Object} An object containing methods for logging info, error, and debug messages.
   */
  public static createLogger(feature: string) {
    if (!LoggerFactory.loggerInstance) {
      throw new Error(
        "Logger is not initialized. Call LoggerFactory.initialize(config) first."
      );
    }
    return {
      info: (message: string) =>
        LoggerFactory.loggerInstance!.info(feature, message),
      error: (message: string) =>
        LoggerFactory.loggerInstance!.error(feature, message),
      debug: (message: string) =>
        LoggerFactory.loggerInstance!.debug(feature, message),
    };
  }
}
