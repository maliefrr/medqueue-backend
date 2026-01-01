import {Router} from 'express'
import { getSchema } from './root.controller'
import { authenticateSchemaAccess } from '../../middleware/auth.middleware';

const router = Router()



router.get('/schema', authenticateSchemaAccess, getSchema)


export default router