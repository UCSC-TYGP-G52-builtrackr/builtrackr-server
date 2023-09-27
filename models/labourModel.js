import { query } from "../config/db.js";

const getLeaves = async () => {
    try {
        const viewLeaveQuery = "SELECT * FROM laborleave";
        const queryResult = await query(viewLeaveQuery);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing leave: ${error.message}`);
        throw new Error(error.message);
    }
    }
const approveLeave = async (laborid, approval,currentDate) => {
    try {
        const approveLeaveQuery = "UPDATE laborleave SET approval = '"+approval+"' WHERE labor_id ="+parseInt(laborid)+"";
        const queryResult = await query(approveLeaveQuery);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error approving leave: ${error.message}`);
        throw new Error(error.message);
    }
}

const declineLeave = async (laborid, approval) => {
    try {
        
        const declineLeaveQuery = "UPDATE laborleave SET approval = '"+approval+"' WHERE labor_id = "+parseInt(laborid)+"";
        const queryResult = await query(declineLeaveQuery);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error declining leave: ${error.message}`);
        throw new Error(error.message);
    }
}
export { getLeaves,approveLeave,declineLeave};