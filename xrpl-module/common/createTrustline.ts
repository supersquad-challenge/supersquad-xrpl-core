const xrpl = require('xrpl');

/**
 * @name createTrustline
 * 
 * @param userIssuer @type string;
 * @param maxAmount @type number
 * 
 * @description
 * 1. when user trying to join supersquad challenge without XRP user must set trustline to current challenge account 
 */

export const createTrustline = async (userIssuer: string, maxAmount: number) => {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
  await client.connect();

  const supersquad = "rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv" // current Challenge Account

  const res = await client.request({
    "TransactionType": "TrustSet",
    "Account": userIssuer,
    "Fee": "100",
    "Flags": 65536, // tfSetfAuth
    "LimitAmount": {
      "currency": "USD", // or other stable coin
      "issuer": supersquad,
      "value": maxAmount
    },
  })

  return res;
}