const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedLog = await LogEntry.deleteOne({ _id: req.params.id });
    res.json(deletedLog);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
