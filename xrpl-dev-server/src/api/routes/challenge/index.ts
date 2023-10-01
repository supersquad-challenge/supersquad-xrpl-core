import express from 'express';
import * as challengeCtrl from './challenge.ctrl';

const router = express.Router();

router.post('/registerChallenge', challengeCtrl.registerChallenge);
router.delete('/deleteChallenge', challengeCtrl.deleteChallenge);
router.post('/createChallenge', challengeCtrl.createChallenge);
router.get('/checkMyChallenge/id', challengeCtrl.checkMyChallenge);
router.get('/getAllChallenges', challengeCtrl.getAllChallenges);

export default router;