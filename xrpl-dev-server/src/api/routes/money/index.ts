import express from 'express';
import * as moneyCtrl from './money.ctrl';

const router = express.Router();

router.get('/getPayback', moneyCtrl.getPayback);

export default router;