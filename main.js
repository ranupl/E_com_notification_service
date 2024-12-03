const runConsumer = require('./consumers/notificationConsumer');

const startApp = async () => {
  try {
    // Start the Kafka consumer
    await runConsumer();
    console.log('Application started successfully');
  } catch (error) {
    console.error('Failed to start the application:', error);
  }
};

startApp();
