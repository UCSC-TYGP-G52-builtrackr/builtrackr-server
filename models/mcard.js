// routes/materials.js

import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

// Define a route to fetch all materials
router.get('/getAllMaterials', async (req, res) => {
  try {
    const result = await query('SELECT * FROM materials');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// Define a route to add a new material
router.post('/addMaterial', async (req, res) => {
  try {
    const { item_name, description, quantity, photo_path } = req.body;

    const sql = `
      INSERT INTO materials (item_name, description, quantity, photo_path)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [item_name, description, quantity, photo_path];

    const result = await query(sql, values);

    if (result.rows.length === 1) {
      const addedMaterial = result.rows[0];
      res.status(201).json(addedMaterial);
    } else {
      res.status(500).json({ error: 'Material could not be added' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Define a route to delete a material by material_id
router.delete('/deleteMaterial/:material_id', async (req, res) => {
  try {
    const { material_id } = req.params;

    const sql = `
      DELETE FROM materials
      WHERE material_id = $1
    `;

    const values = [material_id];

    const result = await query(sql, values);

    if (result.rowCount === 1) {
      res.json({ message: 'Material deleted successfully' });
    } else {
      res.status(404).json({ error: 'Material not found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
