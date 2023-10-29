import { query } from "../config/db.js";

// Define the getAllEquipments function
export const getAllEquipmentRequests = async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipment_request');
    const equipment_requests = result.rows;
    res.json(equipment_requests);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add these new functions to your mrequestcontroller.js
// export const approveEquipmentRequest = async (req, res) => {
//   try {
//     const requestId = req.params.requestId; // Extract the request ID from the request parameters
//     await query('UPDATE equipment_request SET status = $1 WHERE request_id = $2', ['approved', requestId]);
//     res.json({ message: 'Request approved successfully' });
//   } catch (error) {
//     console.error('Error updating equipment request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
export const approveEquipmentRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters

    // Get the requested equipment ID and quantity from the equipment request
    const requestQuery = 'SELECT equipment_id, req_quantity FROM equipment_request WHERE request_id = \$1';
    const { rows: requestResult } = await query(requestQuery, [requestId]);

    if (requestResult.length === 0) {
      return res.status(400).json({ message: 'Request not found' });
    }

    const { equipment_id, req_quantity } = requestResult[0];

    // Update the status in the equipment_request table
    await query('UPDATE equipment_request SET status = \$1 WHERE request_id = \$2', ['approved', requestId]);

    // Deduct the requested quantity from the equipment table
    const equipmentQuery = 'UPDATE equipment SET quantity = quantity - \$1 WHERE equipment_id = \$2';
    await query(equipmentQuery, [req_quantity, equipment_id]);

    res.json({ message: 'Request approved successfully' });
  } catch (error) {
    console.error('Error updating equipment request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





export const rejectEquipmentRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters
    await query('UPDATE equipment_request SET status = $1 WHERE request_id = $2', ['rejected', requestId]);
    res.json({ message: 'Request rejected successfully' });
  } catch (error) {
    console.error('Error updating equipment request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteEquipmentRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters

    // Get the status, equipment ID, and quantity from the equipment request
    const requestQuery = 'SELECT status, equipment_id, req_quantity FROM equipment_request WHERE request_id = \$1';
    const { rows: requestResult } = await query(requestQuery, [requestId]);

    if (requestResult.length === 0) {
      return res.status(400).json({ message: 'Request not found' });
    }

    const { status, equipment_id, req_quantity } = requestResult[0];

    if (status === 'approved') {
      // Add the requested quantity back to the equipment table
      const equipmentQuery = 'UPDATE equipment SET quantity = quantity + \$1 WHERE equipment_id = \$2';
      await query(equipmentQuery, [req_quantity, equipment_id]);
    }

    // Delete the equipment request
    await query('DELETE FROM equipment_request WHERE request_id = \$1', [requestId]);

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting equipment request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Add this new function to your mrequestcontroller.js
export const checkEquipmentQuantity = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters

    // Get the requested equipment ID and quantity from the equipment request
    const requestQuery = 'SELECT equipment_id, req_quantity FROM equipment_request WHERE request_id = $1';
    const { rows: requestResult } = await query(requestQuery, [requestId]);

    if (requestResult.length === 0) {
      return res.status(400).json({ available: false });
    }

    const { equipment_id, req_quantity } = requestResult[0];

    // Get the available quantity from the equipment table
    const equipmentQuery = 'SELECT quantity FROM equipment WHERE equipment_id = $1';
    const { rows: equipmentResult } = await query(equipmentQuery, [equipment_id]);

    if (equipmentResult.length === 0) {
      return res.status(400).json({ available: false });
    }

    const availableQuantity = equipmentResult[0].quantity;

    if (availableQuantity >= req_quantity) {
      return res.json({ available: true });
    } else {
      return res.json({ available: false });
    }
  } catch (error) {
    console.error('Error checking equipment quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
