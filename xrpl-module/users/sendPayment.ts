const xumm = require('xumm');

/**
 * @name sendPayment
 * 
 * @param userIssuer @type string
 * @param deposite @type number
 * 
 * @description
 * 1. when user trying to join supersquad challenge with XRP user will send XRP to current challenge
 */
export const sendPayment = async (userIssuer: string, deposite: number) => {
  const supersquad = "rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv" // current Challenge Account
  
  const payload = await xumm.payload?.createAndSubscribe({
    TransactionType: 'Payment',
    Destination: supersquad,
    Account: userIssuer,
    Amount: String(deposite),
  })

  return payload;
}