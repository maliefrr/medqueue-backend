import { Router } from 'express'
import { 
    createRole, 
    deleteRoleController, 
    getRole, 
    getRoleByIdController, 
    updateRoleController
} from './role.controller';

const router = Router()

router.get('/', getRole)
router.get('/:id', getRoleByIdController)
router.post('/create', createRole)
router.put('/update/:id', updateRoleController)
router.delete('/delete/:id', deleteRoleController)


export default router;