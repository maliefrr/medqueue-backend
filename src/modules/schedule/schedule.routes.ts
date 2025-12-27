import { Router } from "express";
import { 
    createSchedule, 
    getSchedules, 
    updateSchedule, 
    deleteSchedule 
} from "./schedule.controller";

const router: Router = Router()


router.get('/', getSchedules)
router.post('/create', createSchedule)
router.put('/update', updateSchedule)
router.delete('/delete', deleteSchedule)

export default router