const express = require('express');
const router = express.Router();
const messageController = require('../controller/notification.controller');

// Define routes
router.post('/createMessage', messageController.createMessage);
router.get('/getAllMessage', messageController.getAllMessages);
router.get('/getMessageByUserId/:user_id', messageController.getMessagesByUserId);
router.put('/updateMessage/:id', messageController.updateMessage);
router.delete('/deleteMessage/:id', messageController.deleteMessage);

module.exports = router;
