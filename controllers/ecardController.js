// import { query } from "../config/db.js";

// // Define the getAllMaterials function
// export const getAllEquipments = async (req, res) => {
//   try {
//     const result = await query('SELECT * FROM equipments');
//     const materials = result.rows;
//     res.json(materials);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const updateEquipments = async (req, res) => {
//     try {
//       const { equip_id, equip_name, equip_description, equip_qty, equip_image_url } = req.body;
  
//       const sql = `
//         UPDATE equipments
//         SET
//           equip_name = $1,
//           equip_description = $2,
//           equip_qty = $3,
//           equip_image_url = $4
//         WHERE
//           equip_id = $5
//       `;
  
//       const values = [equip_name, equip_description, equip_qty, equip_image_url, equip_id];
  
//       const result = await query(sql, values);
  
//       if (result.rowCount === 1) {
//         res.json({ message: 'Equipments updated successfully' });
//       } else {
//         res.status(404).json({ error: 'Equipments not found' });
//       }
//     } catch (error) {
//       console.error('Error executing query:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
import { query } from "../config/db.js";

// Define the getAllMaterials function
export const getAllEquipments = async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipment');
    const equipments = result.rows;
    res.json(equipments);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Define the addMaterial function
export const addEquipment = async (req, res) => {
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
};

export const deleteEquipment = async (req, res) => {
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
};
















export const updateEquipment = async (req, res) => {
    try {
      const { equipment_id, item_name, description, quantity, photo_path } = req.body;
  
      const sql = `
        UPDATE equipment
        SET
          item_name = $1,
          description = $2,
          quantity = $3,
          photo_path = $4
        WHERE
          equipment_id = $5
      `;
  
      const values = [item_name, description, quantity, photo_path, equipment_id];
  
      const result = await query(sql, values);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Equipment updated successfully' });
      } else {
        res.status(404).json({ error: 'Equipment not found' });
      }
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  