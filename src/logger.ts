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

import { format } from 'date-fns';

/**
 * Logger class responsible for handling log messages with different levels and features.
 *
 * @class Logger
 */
class Logger {
  private level: string;
  private appName: string;
  private timeFormat: string;
  private messageFormat: { prefix?: string; suffix?: string } | null;
  private levels: { [key: string]: number };

  /**
   * Constructs a Logger instance.
   *
   * @param {string} level - The logging level (debug, info, error).
   * @param {string} [appName] - The name of the application.
   * @param {string} [timeFormat] - The format for the timestamp.
   * @param {Object} [messageFormat] - The prefix and suffix for log messages.
   */
  constructor(
    level: string,
    appName?: string,
    timeFormat?: string,
    messageFormat?: { prefix?: string; suffix?: string }
  ) {
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
private formatTime(): string {
  const now = new Date();

  try {
    return format(now, this.timeFormat);
  } catch (error) {
    console.warn(`Invalid time format provided: ${this.timeFormat}. Falling back to default ISO format.`);
    return now.toISOString().replace("T", " ").split(".")[0]; // Fallback to ISO format
  }
}
  /**
   * Formats the log message by adding the specified prefix and suffix.
   *
   * @param {string} message - The log message.
   * @returns {string} The formatted log message.
   */
  private formatMessage(message: string): string {
    if (this.messageFormat) {
      return `${this.messageFormat.prefix || ""}${message}${
        this.messageFormat.suffix || ""
      }`;
    }
    return message;
  }

  /**
   * Logs a message with the specified level and feature.
   *
   * @param {string} level - The logging level (debug, info, error).
   * @param {string} feature - The feature name associated with the log message.
   * @param {string} message - The log message.
   */
  private log(level: string, feature: string, message: string): void {
    if (this.levels[level] >= this.levels[this.level]) {
      const timestamp = this.formatTime();
      const formattedMessage = this.formatMessage(message);
      console.log(
        `${timestamp} [${
          this.appName
        }] [${feature}] ${level.toUpperCase()}: ${formattedMessage}`
      );
    }
  }

  /**
   * Logs an informational message.
   *
   * @param {string} feature - The feature name associated with the log message.
   * @param {string} message - The log message.
   */
  public info(feature: string, message: string): void {
    this.log("info", feature, message);
  }

  /**
   * Logs an error message.
   *
   * @param {string} feature - The feature name associated with the log message.
   * @param {string} message - The log message.
   */
  public error(feature: string, message: string): void {
    this.log("error", feature, message);
  }

  /**
   * Logs a debug message.
   *
   * @param {string} feature - The feature name associated with the log message.
   * @param {string} message - The log message.
   */
  public debug(feature: string, message: string): void {
    this.log("debug", feature, message);
  }
}

export default Logger;
