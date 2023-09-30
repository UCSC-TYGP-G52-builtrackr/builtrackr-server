import { router as employeeRouter } from "./index.js";
import { transporter } from "../utils/mailer.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import {
  loginEmployee,
  registerEmployee,
  test,
  getEmployees,
  getAllEmployees,
  existEmployee,
  existEmployeeByType,
  existEmployeeById,
  getAllemployeesCount,
  existLabourer,
  existLabourerById,
  addLabourer,
  getLabourers,
} from "../controllers/employeeController.js";

employeeRouter.post("/registerEmployee", registerEmployee);
employeeRouter.post("/loginEmployee", loginEmployee);
employeeRouter.post("/getEmployees", getEmployees);
employeeRouter.post("/getAllEmployees", getAllEmployees);
employeeRouter.post("/employeeExists", existEmployee);
employeeRouter.post("/employeeCount", getAllemployeesCount);
employeeRouter.post("/labourerExists", existLabourer);
employeeRouter.post("/labourerExistById", existLabourerById);
employeeRouter.post("/employeeExistsByType", existEmployeeByType);
employeeRouter.post("/EmployeeExistById", existEmployeeById);
employeeRouter.post("/registerLabourer", addLabourer);
employeeRouter.post("/getLabourers", getLabourers);
employeeRouter.post("/hello", test);

export { employeeRouter };
