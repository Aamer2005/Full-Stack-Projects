const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST message
router.post("/", async (req, res) => {
    try {
        const  name  = req.body.name || req.query.name   //query --> through URL
        const msg = req.body.msg || req.query.msg   // body --> through page , postman

        const newMessage = new Message({ name, msg });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/:name/:msg", async (req, res) => {
    try {
        const { name, msg } = req.params;  //throudh /name/msg

        const newMessage = new Message({ name, msg });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all messages
router.get("/", async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
});

module.exports = router;