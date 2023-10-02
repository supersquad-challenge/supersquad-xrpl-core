const xrpl = require('xrpl');

/**
 * @name validateUserTx
 * 
 * @param userIssuer @type string
 * @param txHash @type string
 * @param userDeposite @type number
 * 
 * @description
 * 1. when user call joinChallenge server will validate that user will join this challenge through txHash that user sended and owner address balance of challenge
 * if server judge this info is not valid user can not join this challenge
 * this is a minimum validate logic will add more secure validate logic
*/

export const validateUserTx = async (
  userIssuer: string,
  txHash: string,
  userDeposite: number
) => {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  const isValidTxHash = await client.request({
    "command": "tx",
    "transaction": txHash
  });

  const supersquadBalance = await client.request({
    "command": "account_balance",
    "account": "rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv"
  });


  const isBalanceEnough  =  parseInt(supersquadBalance.account_data.Balance) > userDeposite ? true : false;
  if (!isValidTxHash || !isBalanceEnough) {
    return false;
  }
  return true;
}