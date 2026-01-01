import { Transport, LogEntry } from './types';
export declare class ConsoleTransport implements Transport {
    private useJson;
    private useColor;
    constructor(options?: {
        useJson?: boolean;
        useColor?: boolean;
    });
    private getColor;
    private getReset;
    log(entry: LogEntry): void;
}
