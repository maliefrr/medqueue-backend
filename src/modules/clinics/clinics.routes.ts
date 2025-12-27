import { Router } from "express";
import { 
    createClinic, 
    getClinics, 
    updateClinic, 
    deleteClinic 
} from "./clinics.controller";

const router: Router = Router()

router.get('/', getClinics)
router.post('/create', createClinic)
router.put('/update', updateClinic)
router.delete('/delete', deleteClinic)


export default router