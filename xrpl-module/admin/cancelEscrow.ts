const xrpl = require('xrpl');

/**
 * @name cancelEscrow
 * 
 * @param escrowAddress @type string
 * 
 * @description
 * 1. if user didn't achieved their challenge the condition will not satisfied and 
 * after the time condition expired supersquad server will cancel this escrow
 */

export const cancelEscrow = async (
  escrowAddress: string
) => {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
  await client.connect();

  const supersquad = "rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv" // current Challenge Account

  const res = await client.request({
    "Account": escrowAddress,
    "TransactionType": "EscrowCancel",
    "Owner": supersquad,
  });

  return res;
}