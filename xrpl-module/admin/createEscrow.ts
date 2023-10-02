const xrpl = require('xrpl');

/**
 * @name createEscrow
 * 
 * @param userIssuer @type string
 * @param deposite @type number
 * @param condition @type string
 * 
 * @description
 * 1. when user select to join supersquad challenge and server finished to validate user
 * will create escrow and deposite userDeposite to escrow. This escrow is Combination Escrow.
 * if user achieve this challenge this condition will satistfied and also the time condition expired
 * escrow will send deposited XRP to user. 
 */
export const createEscrow = async (
  userIssuer: string,
  deposite: number,
  condition: string,
) => {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
  await client.connect();

  const supersquad = "rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv" // current Challenge Account

  const res = await client.request({
    "Account": supersquad,
    "TransactionType": "EscrowCreate",
    "Amount": deposite,
    "Destination": userIssuer,
    "CancelAfter": 0,
    "FinishAfter": 0,
    "Condition": condition,
    "DestinationTag": 0,
    "SourceTag": 0
  });

  return res;
}