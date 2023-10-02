import { createTrustline } from '../common/createTrustline';
import { sendPayment } from './sendPayment';
const xrpl = require('xrpl');
const axios = require('axios');

/**
 * @name joinChallenge
 * 
 * @param userIssuer @type string
 * @param challengeId @type string
 * @param deposite @type number
 * @param maxAmount @type number
 * @param type @type boolean
 * 
 * @description
 * 1. user can decide two way to join supersquad challenge
 * 1-1. user can join supersquad challenge with XRP > send payment and send txHash to supersquad server to validate that user will join this challenge
 * 1-2. user can join supersquad challenge without XRP > should set trustline previously
 */

export const joinChallenge = async(
  userIssuer: string,
  challengeId: string,
  deposite: number,
  maxAmount: number,
  type: boolean,
) => {
  if (type === true) { // joinChallenge with XRP
    const paymentInfo = sendPayment(userIssuer, deposite);

    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
    await client.connect();

    const userTxHistory = await client.request({
        "command": "account_tx",
        "account": userIssuer,
    })

    const txHash = userTxHistory.result.transactions[0].tx.hash;

    try {
      const res = await axios.post(`${process.env.BASE_URL}/api/challenge/registerChallenge`, {
        userId: userIssuer,
        challengeId: challengeId,
        txHash: txHash,
        deposite: deposite
      });
    } catch (e) {
      throw new Error(e)
    }
  } else { // joinChallenge without XRP
    const trustlineInfo = createTrustline(userIssuer, maxAmount);
    if (!trustlineInfo) throw new Error (trustlineInfo);

    // Will add send payment with xrp token ex) USD, etc..
  }
}