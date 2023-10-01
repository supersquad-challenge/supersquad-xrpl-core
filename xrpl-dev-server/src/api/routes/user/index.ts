import express from 'express';
import * as userCtrl from './user.ctrl'

const router = express.Router();

router.post('/registerUser', userCtrl.registerUser);

export default router;