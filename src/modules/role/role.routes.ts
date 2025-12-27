import { Router } from 'express'
import { 
    createRole, 
    deleteRole, 
    getRole, 
    updateRole 
} from './role.controller';

const router = Router()

router.get('/', getRole)
router.post('/create', createRole)
router.put('/update', updateRole)
router.delete('/delete', deleteRole)


export default router;