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
import { LoggerConfig, LogLevel, LogLevelPriority, LogEntry, Transport } from './types';
import { ConsoleTransport } from './transports';

/**
 * Enterprise-grade Logger class.
 * Supports multiple transports, structured logging, and configurable formatting.
 *
 * @class Logger
 */
class Logger {
  private config: LoggerConfig;
  private transports: Transport[];

  /**
   * Constructs a Logger instance.
   *
   * @param {LoggerConfig} config - Configuration object.
   */
  constructor(config: LoggerConfig) {
    this.config = config;
    this.transports = config.transports && config.transports.length > 0
      ? config.transports
      : [new ConsoleTransport()];
  }

  private formatTime(): string {
    const now = new Date();
    try {
      return format(now, this.config.timeFormat || "yyyy-MM-dd HH:mm:ss");
    } catch (error) {
      return now.toISOString();
    }
  }

  private formatMessage(message: string): string {
    const { prefix, suffix } = this.config.messageFormat || {};
    return `${prefix || ""}${message}${suffix || ""}`;
  }

  private log(level: LogLevel, feature: string, message: string, meta?: Record<string, any>): void {
    if (LogLevelPriority[level] < LogLevelPriority[this.config.minLevel]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: this.formatTime(),
      level,
      appName: this.config.appName || "MyApp",
      feature,
      message: this.formatMessage(message),
      meta,
    };

    for (const transport of this.transports) {
      try {
        transport.log(entry);
      } catch (e) {
        console.error("Failed to log to transport:", e);
      }
    }
  }

  public debug(feature: string, message: string, meta?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, feature, message, meta);
  }

  public info(feature: string, message: string, meta?: Record<string, any>): void {
    this.log(LogLevel.INFO, feature, message, meta);
  }

  public warn(feature: string, message: string, meta?: Record<string, any>): void {
    this.log(LogLevel.WARN, feature, message, meta);
  }

  public error(feature: string, message: string, meta?: Record<string, any>): void {
    this.log(LogLevel.ERROR, feature, message, meta);
  }

  public fatal(feature: string, message: string, meta?: Record<string, any>): void {
    this.log(LogLevel.FATAL, feature, message, meta);
  }
}

export default Logger;
