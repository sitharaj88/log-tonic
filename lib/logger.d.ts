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
import { LoggerConfig } from './types';
/**
 * Enterprise-grade Logger class.
 * Supports multiple transports, structured logging, and configurable formatting.
 *
 * @class Logger
 */
declare class Logger {
    private config;
    private transports;
    /**
     * Constructs a Logger instance.
     *
     * @param {LoggerConfig} config - Configuration object.
     */
    constructor(config: LoggerConfig);
    private formatTime;
    private formatMessage;
    private log;
    debug(feature: string, message: string, meta?: Record<string, any>): void;
    info(feature: string, message: string, meta?: Record<string, any>): void;
    warn(feature: string, message: string, meta?: Record<string, any>): void;
    error(feature: string, message: string, meta?: Record<string, any>): void;
    fatal(feature: string, message: string, meta?: Record<string, any>): void;
}
export default Logger;
