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
    const {material_name, description, quantity, type, preorder_level } = req.body;

    const sql = `
      INSERT INTO material (material_name, description, quantity, type, preorder_level)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [material_name, description, quantity, type, preorder_level];

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
      const { material_id, material_name, description, quantity, type, preorder_level } = req.body;
  
      const sql = `
        UPDATE material
        SET
          material_name = $1,
          description = $2,
          quantity = $3,
          type = $4,
          preorder_level = $5

        WHERE
          material_id = $6
      `;
  
      const values = [material_name, description, quantity, type, preorder_level, material_id];
  
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
  