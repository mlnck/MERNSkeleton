import { Router } from 'express';
import * as XxxController from '../controllers/xxx.controller';
import Xxx from '../models/xxx';
const router = new Router();

router.get('/', XxxController.xxx);
export default router;
