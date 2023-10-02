import { createXrplAccount } from "../common/createAccount";

const axios = require('axios');

/**
 * @name createChallenge
 * 
 * @param title @type string
 * @param desc @type string
 * @param startDate @type string
 * @param endDate @type string
 * 
 * @description
 * 1. when admin create new challenge will created new XRPL issuer address for owner address of created challenge
 */

export  const createChallenge = async (
  title: string,
  desc: string,
  startDate: string,
  endDate: string,
) => {
  const ownerAddress = await createXrplAccount();
  const res = await axios.post(`${process.env.BASE_URL}/api/challenge/createChallenge`, {
    title: title,
    desc: desc,
    startDate: startDate,
    endDate: endDate,
    ownerAddress: ownerAddress.account
  })

  return res.data.ownerAddress;
}