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

const leaveData = async () => {
    try {
        const leaveDataQuery = "SELECT count(*) as count FROM laborleave";
        const queryResult = await query(leaveDataQuery);
        return queryResult.rows[0]
    } catch (error) {
        console.error(`Error viewing leave: ${error.message}`);
        throw new Error(error.message);
    }
}

const getData = async () => {
    try {
        const getDataQuery = "SELECT * FROM labour";
        const queryResult = await query(getDataQuery);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing data: ${error.message}`);
        throw new Error(error.message);
    }
}

const getStatus = async () => {
    try {
        const getStatusQuery = "SELECT DATE_TRUNC('month', leave_start_date) AS month, COUNT(*) AS declined_approvals FROM laborleave WHERE approval = 'declined' GROUP BY month ORDER BY month";
        const queryResult = await query(getStatusQuery);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing status: ${error.message}`);
        throw new Error(error.message);
    }
}

const leaveCount = async () => {
    try {
        const leaveCountQuery = "SELECT count(*) as count FROM laborleave";
        const queryResult = await query(leaveCountQuery);
        return queryResult.rows[0]
    } catch (error) {
        console.error(`Error viewing leave: ${error.message}`);
        throw new Error(error.message);
    }
}



export { getLeaves,approveLeave,declineLeave,leaveData,getData,getStatus,leaveCount};
