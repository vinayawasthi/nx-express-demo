import * as express from 'express';
import controller from '../controllers/Auth';

const router = express.Router();

router.post('/auth/login', controller.login);

export default router;