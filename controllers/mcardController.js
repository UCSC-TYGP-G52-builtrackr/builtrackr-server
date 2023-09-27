import { query } from "../config/db.js";

// Define the getAllMaterials function
export const getAllMaterials = async (req, res) => {
  try {
    const result = await query('SELECT * FROM material');
    const materials = result.rows;
    res.json(materials);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Define the addMaterial function
export const addMaterial = async (req, res) => {
  try {
    const { item_name, description, quantity, photo_path } = req.body;

    const sql = `
      INSERT INTO material (item_name, description, quantity, photo_path)
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
};

export const deleteMaterial = async (req, res) => {
  try {
    const { material_id } = req.params;

    const sql = `
      DELETE FROM material
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
};
















export const updateMaterial = async (req, res) => {
    try {
      const { material_id, item_name, description, quantity, photo_path } = req.body;
  
      const sql = `
        UPDATE material
        SET
          item_name = $1,
          description = $2,
          quantity = $3,
          photo_path = $4
        WHERE
          material_id = $5
      `;
  
      const values = [item_name, description, quantity, photo_path, material_id];
  
      const result = await query(sql, values);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Material updated successfully' });
      } else {
        res.status(404).json({ error: 'Material not found' });
      }
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  