const xrpl = require('xrpl');

export const checkBlock = async (userId: string, txHash: string, deposite: number) => {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
  await client.connect();

  const isValidTxHash = await client.request({
    "command": "tx",
    "transaction": txHash
  });
  
  const accountBalance = await client.request({
    "command": "account_info",
    "account": "rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv"
  })

  const isBalanceEnough  =  parseInt(accountBalance.account_data.Balance) > deposite ? true : false;
  if (!isValidTxHash || !isBalanceEnough) {
    return false;
  }
  return true;
}
