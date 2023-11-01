import { router as paymentRouter } from "./index.js";
import { allPaymentDetails } from "../controllers/paymentController.js";


paymentRouter.post("/paymentDetails", allPaymentDetails);

export { paymentRouter };
