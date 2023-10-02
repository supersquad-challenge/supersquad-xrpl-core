const xrpl = require('xrpl');

/**
 * @name finishEscrow
 *  
 * @param escrowAddress 
 * @param condition 
 * 
 * @description
 * 1. if user achieved their challenge the condition will satisfied and 
 * after the time condition expired supersquad server will finish this escrow
 */
export const finishEscrow = async (
  escrowAddress: string,
  condition: string
) => {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
  await client.connect();

  const supersquad = "rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv" // current Challenge Account

  const res = await client.request({
    "Account": escrowAddress,
    "TransactionType": "EscrowFinish",
    "Owner": supersquad,
    "Condition": condition,
    "Fulfillment": "A0028000"
  })

  return res;
}