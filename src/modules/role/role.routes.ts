import { Router } from 'express'
import { 
    createRole, 
    deleteRoleController, 
    getRole, 
    getRoleByIdController, 
    updateRoleController
} from './role.controller';
import { authenticateAndAuthorizeRoleManagement } from '../../middleware/auth.middleware';

const router = Router()

router.get('/', authenticateAndAuthorizeRoleManagement, getRole)
router.get('/:id', authenticateAndAuthorizeRoleManagement, getRoleByIdController)
router.post('/create', authenticateAndAuthorizeRoleManagement, createRole)
router.put('/update/:id', authenticateAndAuthorizeRoleManagement, updateRoleController)
router.delete('/delete/:id', authenticateAndAuthorizeRoleManagement, deleteRoleController)


export default router;