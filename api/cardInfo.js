import { addCardInfo, getCardInfo,addCardInfoTask,
    getCardInfoTask ,updateCardInfo,updateCardInfoDesc, updateCardTitle} from "../controllers/cardInfoController.js";
import { router as cardInfoRouter } from "./index.js";

cardInfoRouter.post("/addLabel", addCardInfo);
cardInfoRouter.get("/getLabel", getCardInfo);
cardInfoRouter.post("/addCardInfoTask", addCardInfoTask);
cardInfoRouter.get("/getCardInfoTask", getCardInfoTask);
cardInfoRouter.post("/updateCardInfo", updateCardInfo);
cardInfoRouter.post("/updateDesc", updateCardInfoDesc);
cardInfoRouter.post("/updateTitle", updateCardTitle);



export { cardInfoRouter };

