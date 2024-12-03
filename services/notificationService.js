const emailService = require('./email');
const smsService = require('./sms');
const whatsappService = require('./whatsapp');

/**
 * Delegates handling to the appropriate service based on the topic.
 * @param {Object} notification - The notification payload.
 * @param {string} topic - The Kafka topic name.
 */

const handleNotification = (notification, topic) => {
  switch (topic) {
    case 'email_notification':
      emailService.handleEmailNotification(notification);
      break;
    case 'sms_notification':
      smsService.handleSmsNotification(notification);
      break;
    case 'whatsapp_notification':
      whatsappService.handleWhatsappNotification(notification);
      break;
    default:
      console.error(`Unknown topic: ${topic}`);
  }
};

module.exports = { handleNotification };
