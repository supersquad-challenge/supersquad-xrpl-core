const xrpl = require('xrpl');

/**
 * @name createXrplAccount
 * 
 * 
 * @description
 * 1. when user doesn't have XRPL Account will call createXrplAccount function;
 * 2. when admin create new challenge will call createXrplAccount and going to manage challenge through this account;
 */

export const createXrplAccount = async () => {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
  await client.connect();

  let account;
  let balance;
  client.fundWallet().then((res) => {
    account = res.wallet;
    balance = res.balance;
  })
  return { account, balance };
};

