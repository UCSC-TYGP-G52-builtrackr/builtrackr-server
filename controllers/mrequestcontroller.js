import { query } from "../config/db.js";

// Define the getAllMaterials function
export const getAllMaterialRequests = async (req, res) => {
  try {
    const result = await query('SELECT * FROM material_request');
    const material_requests = result.rows;
    res.json(material_requests);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};