// // routes/materials.js

// import express from 'express';
// import { query } from '../config/db.js';

// const router = express.Router();

// // Define a route to fetch all materials
// router.get('/getAllEquipments', async (req, res) => {
//   try {
//     const result = await query('SELECT * FROM equipments');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export default router;
// routes/materials.js

import express from 'express';
import { query } from '../config/db.js';

const router = express.Router();

// Define a route to fetch all materials
router.get('/getAllEquipments', async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipment');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// Define a route to add a new material
router.post('/addEquipment', async (req, res) => {
  try {
    const { item_name, description, quantity, photo_path } = req.body;

    const sql = `
      INSERT INTO equipment (item_name, description, quantity, photo_path)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [item_name, description, quantity, photo_path];

    const result = await query(sql, values);

    if (result.rows.length === 1) {
      const addedEquipment = result.rows[0];
      res.status(201).json(addedEquipment);
    } else {
      res.status(500).json({ error: 'Equipment could not be added' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Define a route to delete a material by material_id
router.delete('/deleteEquipment/:equipment_id', async (req, res) => {
  try {
    const { equipment_id } = req.params;

    const sql = `
      DELETE FROM equipment
      WHERE equipment_id = $1
    `;

    const values = [equipment_id];

    const result = await query(sql, values);

    if (result.rowCount === 1) {
      res.json({ message: 'Equipment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Equipment not found' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
