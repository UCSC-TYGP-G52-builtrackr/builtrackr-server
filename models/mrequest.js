
import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

// Define a route to fetch all materials
router.get('/getAllMaterialRequests', async (req, res) => {
  try {
    const result = await query('SELECT * FROM material_request');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
