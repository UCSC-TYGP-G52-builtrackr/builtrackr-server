// routes/materials.js

import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

// Define a route to fetch all materials
router.get('/getAllEquipments', async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipments');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
