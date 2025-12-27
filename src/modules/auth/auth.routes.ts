import { Router } from "express";
import { 
    LoginController, 
    RegisterController 
} from "./auth.controller";


const router: Router = Router()

router.post('/login', LoginController)
router.post('/register', RegisterController)




export default router