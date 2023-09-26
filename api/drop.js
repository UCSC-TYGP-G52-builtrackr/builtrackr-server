import { router as dropRouter} from "./index.js";
import {DropDown} from "../controllers/dropdown.js";



dropRouter.get('/dropdown', DropDown);


export {dropRouter};