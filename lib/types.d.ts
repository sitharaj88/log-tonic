export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    FATAL = "fatal"
}
export declare const LogLevelPriority: Record<LogLevel, number>;
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    appName: string;
    feature?: string;
    message: string;
    meta?: Record<string, any>;
}
export interface Transport {
    log(entry: LogEntry): void;
}
export interface LoggerConfig {
    minLevel: LogLevel;
    appName?: string;
    timeFormat?: string;
    transports?: Transport[];
    messageFormat?: {
        prefix?: string;
        suffix?: string;
    };
}
