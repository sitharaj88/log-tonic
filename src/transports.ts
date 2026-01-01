import { Transport, LogEntry, LogLevel } from './types';

export class ConsoleTransport implements Transport {
    private useJson: boolean;
    private useColor: boolean;

    constructor(options: { useJson?: boolean; useColor?: boolean } = {}) {
        this.useJson = options.useJson || false;
        this.useColor = options.useColor !== false; // Default to true
    }

    private getColor(level: LogLevel): string {
        if (!this.useColor) return '';
        switch (level) {
            case LogLevel.DEBUG: return '\x1b[34m'; // Blue
            case LogLevel.INFO: return '\x1b[32m'; // Green
            case LogLevel.WARN: return '\x1b[33m'; // Yellow
            case LogLevel.ERROR: return '\x1b[31m'; // Red
            case LogLevel.FATAL: return '\x1b[35m'; // Magenta
            default: return '\x1b[37m'; // White
        }
    }

    private getReset(): string {
        return this.useColor ? '\x1b[0m' : '';
    }

    public log(entry: LogEntry): void {
        if (this.useJson) {
            console.log(JSON.stringify(entry));
            return;
        }

        const color = this.getColor(entry.level);
        const reset = this.getReset();

        const metaStr = entry.meta && Object.keys(entry.meta).length > 0
            ? ` ${JSON.stringify(entry.meta)}`
            : '';

        const featureStr = entry.feature ? ` [${entry.feature}]` : '';

        console.log(
            `${entry.timestamp} [${entry.appName}]${featureStr} ${color}${entry.level.toUpperCase()}${reset}: ${entry.message}${metaStr}`
        );
    }
}
