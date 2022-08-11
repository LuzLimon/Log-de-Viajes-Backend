const { Router } = require('express');
const CatEntry = require('../models/Categorie');
const router = Router();

router.get('/', async (req, res, next) => {
    try {
      const entries = await CatEntry.find();
      res.json(entries);
    } catch (error) {
      next(error);
    }
  });
  
  router.post('/', async (req, res, next) => {
    try {
      const catEntry = new CatEntry(req.body);
      const createdEntry = await catEntry.save();
      res.json(createdEntry);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(422);
      }
      next(error);
    }
  });

module.exports = router;