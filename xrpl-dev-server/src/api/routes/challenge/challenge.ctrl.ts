import Joi from "joi";
import ChallengeInfo from "../../../model/challengeInfo";
import { checkBlock } from "../../../utils/checkBlock";
import { createEscrow } from "../../../utils/createEscrow";

/**
 * @name Challenge 참여 API
 * @param userId, address, amount, challengeId
 * 
 * @check
 * 1. user의 address로 XRP가 입금되었는지,
 * 2. challengeId에 해당하는 challenge가 존재하는지,
 * 3. challengeId에 해당하는 challenge까 startDate 이전이고 endDate 이후인지
 */
export const registerChallenge = async (req, res) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    challengeId: Joi.string().required(),
    txHash: Joi.string().required(),
    deposite: Joi.number().required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    console.log(result);
    res.status(400);
  }

  const { userId, challengeId, txHash, deposite } = req.body;
  console.log(userId, challengeId, txHash, deposite);
  const isValid = await checkBlock(userId, txHash, deposite);
  if (!isValid) {
    res.status(400)
    return ;
  }

  const escrow = createEscrow();

  try {
    const prev = await ChallengeInfo.findById(challengeId);

    const challenge = await ChallengeInfo.findByIdAndUpdate(challengeId, {
      title: prev.title,
      desc: prev.desc,
      users: [...prev.users, {
        id: userId,
        escrow: '',
        achievement: 0,
        deposite: deposite
      }],
      startDate: prev.startDate,
      endDate: prev.endDate
    }, { new: true }).exec();

    res.send(challenge);
  } catch (e) {
    res.send(e);
  }
}

/**
 * @name Challenge 제거 API 
 * @param challengeId // only admin
 * 
 */
export const deleteChallenge = (req, res) => {

}

/**
 * @name Challenge 조회 API
 * @param none;
 */
export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await ChallengeInfo.find({});
    res.send(challenges);
  } catch (e) {
    res.send(e);
  }
}

/**
 * @name Challenge 생성 API
 * @param title, desc, users[], startDate, endDate // only admin
 *  
 */
export const createChallenge = async (req, res) => {
  
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  });
  
  const result = schema.validate(req.body);
  if (result.error) {
    console.log(result)
    res.status(400);
  }
  const { title, desc, startDate, endDate } = req.body;
  console.log(title, desc, startDate, endDate);

  const challenge = new ChallengeInfo({
    title: title,
    desc: desc,
    users: [],
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  })
  console.log(challenge);

  try {
    await challenge.save();
    res.send(challenge)
  } catch (e) {
    res.send(e);
  }
}

/**
 * @name Challenge 조회 API
 * @param userId
 *  
 * @check
 * 1. 존재하는 userId인지
 */
export const checkMyChallenge = (req, res) => {

}