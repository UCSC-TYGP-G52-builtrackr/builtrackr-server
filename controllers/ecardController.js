import { query } from "../config/db.js";

// Define the getAllMaterials function
export const getAllEquipments = async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipments');
    const materials = result.rows;
    res.json(materials);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateEquipments = async (req, res) => {
    try {
      const { equip_id, equip_name, equip_description, equip_qty, equip_image_url } = req.body;
  
      const sql = `
        UPDATE equipments
        SET
          equip_name = $1,
          equip_description = $2,
          equip_qty = $3,
          equip_image_url = $4
        WHERE
          equip_id = $5
      `;
  
      const values = [equip_name, equip_description, equip_qty, equip_image_url, equip_id];
  
      const result = await query(sql, values);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Equipments updated successfully' });
      } else {
        res.status(404).json({ error: 'Equipments not found' });
      }
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  