import {query} from '../config/db.js'



const viewEmployee = async () => {
    const availableValue = 1;
    try {
        const viewEmployeeQuery = 'SELECT * from "Employee" WHERE available = $1';
        const queryResult = await query(viewEmployeeQuery, [availableValue]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing employee: ${error.message}`);
        throw new Error(error.message);
    }
}

const updateEmployee = async (employeeId) => {
    const available = 0;
    try {
        const updateEmployeeQuery = 'UPDATE "Employee" SET available = $1 WHERE id = $2';
        const queryResult = await query(updateEmployeeQuery, [available, employeeId]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error updating employee: ${error.message}`);
        throw new Error(error.message);
    }
}




export {viewEmployee , updateEmployee};