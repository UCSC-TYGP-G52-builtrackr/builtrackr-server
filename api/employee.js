import { router as employeeRouter } from "./index.js";
import { transporter } from "../utils/mailer.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";
import { registerEmployee } from "../controllers/employeeController.js";

employeeRouter.post("/registerEmployee", registerEmployee);

export {employeeRouter}