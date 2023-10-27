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

// Add these new functions to your mrequestcontroller.js
export const approveMaterialRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters
    await query('UPDATE material_request SET status = $1 WHERE request_id = $2', ['approved', requestId]);
    res.json({ message: 'Request approved successfully' });
  } catch (error) {
    console.error('Error updating material request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectMaterialRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters
    await query('UPDATE material_request SET status = $1 WHERE request_id = $2', ['rejected', requestId]);
    res.json({ message: 'Request rejected successfully' });
  } catch (error) {
    console.error('Error updating material request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
