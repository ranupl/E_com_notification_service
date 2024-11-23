const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  message_type: {
    type: String,
    required: true,
    enum: ['order_confirmation', 'promotion', 'other'], 
  },
  message_content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['sent', 'pending'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
