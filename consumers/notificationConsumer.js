const kafka = require('../config/kafka');
const consumer = kafka.consumer({ groupId: 'notification-group' });

const runConsumer = async () => {
  await consumer.connect();

  // Subscribe to multiple topics
  const topics = ['email_notification', 'sms_notification', 'whatsapp_notification'];
  await Promise.all(
    topics.map(topic => consumer.subscribe({ topic, fromBeginning: true }))
  );

  console.log('Consumer connected and listening for messages on multiple topics...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const notification = JSON.parse(message.value.toString());
        console.log(`Received notification from ${topic}:`, notification);

        // Process the notification or delegate to a service
        require('../services/notificationService').handleNotification(notification, topic);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    },
  });
};

module.exports = runConsumer;

