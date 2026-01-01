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
import { LoggerConfig } from "./types";

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
      LoggerFactory.loggerInstance = new Logger(config);
    }
    return LoggerFactory.loggerInstance;
  }

  /**
   * Creates a logger for the specified feature.
   *
   * @param {string} feature - The feature name for which to create the logger.
   * @returns {Object} An object containing methods for logging.
   */
  public static createLogger(feature: string) {
    if (!LoggerFactory.loggerInstance) {
      throw new Error(
        "Logger is not initialized. Call LoggerFactory.initialize(config) first."
      );
    }
    return {
      debug: (message: string, meta?: Record<string, any>) =>
        LoggerFactory.loggerInstance!.debug(feature, message, meta),
      info: (message: string, meta?: Record<string, any>) =>
        LoggerFactory.loggerInstance!.info(feature, message, meta),
      warn: (message: string, meta?: Record<string, any>) =>
        LoggerFactory.loggerInstance!.warn(feature, message, meta),
      error: (message: string, meta?: Record<string, any>) =>
        LoggerFactory.loggerInstance!.error(feature, message, meta),
      fatal: (message: string, meta?: Record<string, any>) =>
        LoggerFactory.loggerInstance!.fatal(feature, message, meta),
    };
  }
}
