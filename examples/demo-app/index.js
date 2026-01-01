const { LoggerFactory, LogLevel, ConsoleTransport } = require('log-tonic');

// 1. Initialize Log-Tonic
// We configure it to output JSON logs for easier parsing, but keep colors off for JSON.
console.log('--- Initializing Log-Tonic ---');
LoggerFactory.initialize({
    minLevel: LogLevel.DEBUG,
    appName: 'DemoPaymentApp',
    transports: [
        new ConsoleTransport({
            useJson: false, // Set to true to see structured JSON output
            useColor: true,
        }),
    ],
});

// 2. Create Feature-Specific Loggers
const systemLogger = LoggerFactory.createLogger('System');
const paymentLogger = LoggerFactory.createLogger('PaymentGateway');
const authLogger = LoggerFactory.createLogger('Auth');

// 3. Simulate Application Flow
async function runDemo() {
    systemLogger.info('Application starting up...', { nodeVersion: process.version });

    // Simulate startup delay
    await new Promise((r) => setTimeout(r, 500));
    systemLogger.debug('Loading configuration files');

    // Simulate Auth
    authLogger.info('User attempting login', { username: 'jdoe' });

    // Simulate Success
    authLogger.info('Login successful', { userId: 'u-12345', role: 'admin' });

    // Simulate Payment Processing
    try {
        processPayment('u-12345', 99.99);
    } catch (err) {
        paymentLogger.error('Payment transaction failed', { error: err.message });
    }

    // Simulate a Fatal Error
    systemLogger.fatal('Database connection lost!', { retryAttempt: 1 });
}

function processPayment(userId, amount) {
    paymentLogger.info('Initiating payment', { userId, amount, currency: 'USD' });

    if (amount > 500) {
        paymentLogger.warn('High value transaction detected', { amount });
    }

    // Simulate random failure
    const isSuccess = Math.random() > 0.5;
    if (!isSuccess) {
        throw new Error('Gateway Timeout');
    }

    paymentLogger.info('Payment complete', { transactionId: 'tx-98765' });
}

// Run the demo
runDemo();
