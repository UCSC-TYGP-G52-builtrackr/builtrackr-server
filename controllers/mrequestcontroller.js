import { query } from "../config/db.js";

// Define the getAllMaterials function
export const getAllMaterialRequests = async (req, res) => {
  try {
    const result = await query('SELECT * FROM material_request order by request_id desc');
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

    // Get the requested material ID and quantity from the material request
    const requestQuery = 'SELECT material_id, req_quantity FROM material_request WHERE request_id = \$1';
    const { rows: requestResult } = await query(requestQuery, [requestId]);

    if (requestResult.length === 0) {
      return res.status(400).json({ message: 'Request not found' });
    }

    const { material_id, req_quantity } = requestResult[0];

    // Update the status in the material_request table
    await query('UPDATE material_request SET status = \$1 WHERE request_id = \$2', ['Approved', requestId]);

    // Deduct the requested quantity from the material table
    const materialQuery = 'UPDATE material SET quantity = quantity - \$1 WHERE material_id = \$2';
    await query(materialQuery, [req_quantity, material_id]);

    res.json({ message: 'Request Approved successfully' });
  } catch (error) {
    console.error('Error updating material request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const rejectMaterialRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters
    await query('UPDATE material_request SET status = $1 WHERE request_id = $2', ['Rejected', requestId]);
    res.json({ message: 'Request Rejected successfully' });
  } catch (error) {
    console.error('Error updating material request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteMaterialRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters
    await query('DELETE FROM material_request WHERE request_id = $1', [requestId]);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting material request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// export const deleteMaterialRequest = async (req, res) => {
//   try {
//     const requestId = req.params.requestId; // Extract the request ID from the request parameters

//     // Get the status, material ID, and quantity from the material request
//     const requestQuery = 'SELECT status, material_id, req_quantity FROM material_request WHERE request_id = \$1';
//     const { rows: requestResult } = await query(requestQuery, [requestId]);

//     if (requestResult.length === 0) {
//       return res.status(400).json({ message: 'Request not found' });
//     }

//     const { status, material_id, req_quantity } = requestResult[0];

//     if (status === 'approved') {
//       // Add the requested quantity back to the material table
//       const materialQuery = 'UPDATE material SET quantity = quantity + \$1 WHERE material_id = \$2';
//       await query(materialQuery, [req_quantity, material_id]);
//     }

//     // Delete the material request
//     await query('DELETE FROM material_request WHERE request_id = \$1', [requestId]);

//     res.json({ message: 'Request deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting material request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };





// Add this new function to your mrequestcontroller.js
export const checkMaterialQuantity = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Extract the request ID from the request parameters

    // Get the requested material ID and quantity from the material request
    const requestQuery = 'SELECT material_id, req_quantity FROM material_request WHERE request_id = $1';
    const { rows: requestResult } = await query(requestQuery, [requestId]);

    if (requestResult.length === 0) {
      return res.status(400).json({ available: false });
    }

    const { material_id, req_quantity } = requestResult[0];

    // Get the available quantity from the material table
    const materialQuery = 'SELECT quantity FROM material WHERE material_id = $1';
    const { rows: materialResult } = await query(materialQuery, [material_id]);

    if (materialResult.length === 0) {
      return res.status(400).json({ available: false });
    }

    const availableQuantity = materialResult[0].quantity;

    if (availableQuantity >= req_quantity) {
      return res.json({ available: true });
    } else {
      return res.json({ available: false });
    }
  } catch (error) {
    console.error('Error checking material quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
