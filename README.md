
# Log-Tonic

**Log-Tonic** is a powerful and flexible logging utility for Node.js and TypeScript projects. It allows you to easily manage and format log messages across different features or modules within your application, with customizable prefixes, suffixes, and time formats.

## Features

- **Easy Initialization**: Initialize once with global settings for your entire application.
- **Feature-Specific Logging**: Create loggers tailored for specific features or modules.
- **Customizable Message Format**: Add optional prefixes and suffixes to log messages for better readability.
- **Support for Multiple Log Levels**: Includes support for `debug`, `info`, and `error` log levels.
- **TypeScript Support**: Fully typed with `.d.ts` files included for better integration in TypeScript projects.

## Installation

You can install Log-Tonic via npm:

```bash
npm install log-tonic
```

## Usage

### 1. Initialize the Logger

Initialize the logger at the start of your application with the desired configuration:

```typescript
import { LoggerFactory } from 'log-tonic';

LoggerFactory.initialize({
  level: 'debug',
  appName: 'MyApp',
  timeFormat: 'yyyy-MM-dd HH:mm:ss', // Custom time format using date-fns
  messageFormat: { prefix: '--> INFO: ', suffix: ' <-- END' } // Optional custom prefix and suffix
});
```

### 2. Create Feature-Specific Loggers

Create a logger for a specific feature or module within your application:

```typescript
const authLogger = LoggerFactory.createLogger('AuthService');

authLogger.info('User login successful');
authLogger.error('User login failed');
authLogger.debug('User login attempt with username "admin"');
```

### 3. Available Configuration Options

- **level**: Sets the global log level. Available options are `debug`, `info`, `error`.
- **appName**: The name of your application (default is `MyApp`).
- **timeFormat**: The format for timestamps, using date-fns format tokens (e.g., `yyyy-MM-dd HH:mm:ss`).
- **messageFormat**: Optionally set `prefix` and `suffix` to wrap your log messages (e.g., `{ prefix: '--> INFO: ', suffix: ' <-- END' }`).

## Example

```typescript
const paymentLogger = LoggerFactory.createLogger('PaymentService');

paymentLogger.info('Payment processed successfully');
paymentLogger.error('Payment failed');
paymentLogger.debug('Processing payment for user ID 123');
```

This example will produce logs formatted like:

```
2024-08-11 13:45:30 [MyApp] [PaymentService] INFO: --> INFO: Payment processed successfully <-- END
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
