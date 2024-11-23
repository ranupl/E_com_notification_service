const Message = require('../models/notification.model'); // Path to the Message model

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { user_id, message_type, message_content, status } = req.body;

    // Create a new message document
    const newMessage = new Message({
      user_id,
      message_type,
      message_content,
      status,
    });

    // Save the message in the database
    const savedMessage = await newMessage.save();

    res.status(201).json({
      message: 'Message created successfully',
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating message',
      error: error.message,
    });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving messages',
      error: error.message,
    });
  }
};

// Get messages by user_id
exports.getMessagesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const messages = await Message.find({ user_id });

    if (!messages.length) {
      return res.status(404).json({
        message: 'No messages found for this user',
      });
    }

    res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving messages',
      error: error.message,
    });
  }
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message_type, message_content, status } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      {
        message_type,
        message_content,
        status,
        updated_at: Date.now(), // Update the timestamp
      },
      { new: true } // Return the updated document
    );

    if (!updatedMessage) {
      return res.status(404).json({
        message: 'Message not found',
      });
    }

    res.status(200).json({
      message: 'Message updated successfully',
      data: updatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating message',
      error: error.message,
    });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        message: 'Message not found',
      });
    }

    res.status(200).json({
      message: 'Message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting message',
      error: error.message,
    });
  }
};
