import { router as employeeRouter } from "./index.js";
import { transporter } from "../utils/mailer.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import {
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
  getLabourerTypes,
  addLabourerTypes,
  siteEmployees,
  employeeForRequestAprove,
} from "../controllers/employeeController.js";

employeeRouter.post("/registerEmployee", registerEmployee);
employeeRouter.post("/getEmployees", getEmployees);
employeeRouter.post("/getAllEmployees", getAllEmployees);
employeeRouter.post("/getLabourerTypes", getLabourerTypes);
employeeRouter.post("/employeeExists", existEmployee);
employeeRouter.post("/employeeCount", getAllemployeesCount);
employeeRouter.post("/labourerExists", existLabourer);
employeeRouter.post("/labourerExistById", existLabourerById);
employeeRouter.post("/employeeExistsByType", existEmployeeByType);
employeeRouter.post("/EmployeeExistById", existEmployeeById);
employeeRouter.post("/registerLabourer", addLabourer);
employeeRouter.post("/getLabourers", getLabourers);
employeeRouter.post("/addLabourerTypes", addLabourerTypes);
employeeRouter.post("/siteEmployees", siteEmployees);
employeeRouter.post("/employeeForRequestAprove",employeeForRequestAprove)

employeeRouter.post("/hello", test);

export { employeeRouter };
