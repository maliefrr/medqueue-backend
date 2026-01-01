import {Router} from 'express'
import { getSchema } from './root.controller'

const router = Router()



router.get('/schema', getSchema)


export default router