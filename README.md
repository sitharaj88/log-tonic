
# Log-Tonic

**Log-Tonic** is an enterprise-grade, flexible logging utility for Node.js and TypeScript projects. It supports structured JSON logging, multiple transports (Console, File, etc.), log levels, and customizable formatting.

## Features

- **Enterprise Ready**: Structured JSON logging out of the box for easy ingestion by tools like Splunk, ELK, etc.
- **Transport System**: Modular transport system. Writes to Console by default, but extensible to File, HTTP, etc.
- **Rich Log Levels**: Support for `debug`, `info`, `warn`, `error`, and `fatal`.
- **Feature-Specific Logging**: Create scoped loggers for different modules or features.
- **TypeScript Support**: Built with TypeScript for full type safety.

## Installation

You can install Log-Tonic via npm:

```bash
npm install log-tonic
```

## Usage

### 1. Initialize the Logger

Initialize the logger at the start of your application with the desired configuration:

```typescript
import { LoggerFactory, ConsoleTransport, LogLevel } from 'log-tonic';

LoggerFactory.initialize({
  minLevel: LogLevel.DEBUG,
  appName: 'MyEnterpriseApp',
  transports: [
    new ConsoleTransport({ 
      useJson: true, // Enable structured JSON logging
      useColor: true // Enable colors for non-JSON output 
    })
  ]
});
```

### 2. Create Feature-Specific Loggers

Create a logger for a specific feature or module within your application:

```typescript
const authLogger = LoggerFactory.createLogger('AuthService');

// Pass metadata object as the second argument
authLogger.info('User login successful', { userId: '12345', role: 'admin' });
authLogger.error('Login failed', { error: 'Invalid credentials' });
```

### 3. Log Levels

Available log levels in order of priority:
1. `DEBUG`
2. `INFO`
3. `WARN`
4. `ERROR`
5. `FATAL`

### 4. Custom Transports

You can create custom transports by implementing the `Transport` interface:

```typescript
import { Transport, LogEntry } from 'log-tonic';

class MyCustomTransport implements Transport {
  log(entry: LogEntry): void {
    // Send log to external service
    console.log('Sending to cloud:', entry);
  }
}
```

## Migration Guide (v1.0.x -> v1.1.0)

If you are upgrading from `v1.0.1` or earlier, there are some breaking changes to support the new enterprise features.

### 1. Initialization Changes

The `level` property has been renamed to `minLevel` and now accepts a `LogLevel` enum instead of a string.

**v1.0.0 (Old):**
```typescript
LoggerFactory.initialize({
  level: 'debug',
  appName: 'MyApp'
});
```

**v1.1.0 (New):**
```typescript
import { LoggerFactory, LogLevel } from 'log-tonic';

LoggerFactory.initialize({
  minLevel: LogLevel.DEBUG, // Changed from string to Enum
  appName: 'MyApp'
  // Transports are optional, defaults to ConsoleTransport
});
```

### 2. Log Levels

We have moved from strict string types to an Enum for better type safety and added new levels.

- Old: `'debug'`, `'info'`, `'error'`
- New: `LogLevel.DEBUG`, `LogLevel.INFO`, `LogLevel.WARN`, `LogLevel.ERROR`, `LogLevel.FATAL`

### 3. Creating Loggers

`createLogger` remains largely valid, but methods now support metadata objects.

```typescript
// v1.0.0
logger.info('Message');

// v1.1.0
logger.info('Message'); // Still works
logger.info('Message', { meta: 'data' }); // New capability
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License

Log-Tonic is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for more details.

## Links

- [GitHub Repository](https://github.com/sitharaj88/log-tonic)
- [npm Package](https://www.npmjs.com/package/log-tonic)
