"use client"
import Button from '@/components/base/Button'
import { ChallengeType } from '@/types/Challenge';
import axios from 'axios';
import { useState } from 'react';
import { xrpToDrops } from 'xrpl';
import { Xumm } from 'xumm'

const xrpl = require('xrpl');
const xumm = new Xumm("ca03891f-9092-4061-9db2-771749a2c9c3")

export default function Home() {
  const [address, setAddress] = useState<string | undefined>('');
  const [balance, setBalance] = useState<number>(0);
  const [appName, setAppName] = useState<string>('');
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);
  const [payloadUuid, setPayloadUuid] = useState('');
  const [lastPayloadUpdate, setLastPayloadUpdate] = useState('');
  const [openPayloadUrl, setOpenPayloadUrl] = useState('')
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')

  const handleCreateAccount = async () => {
    await client.connect();
    client.fundWallet().then((res: any) => {
      setBalance(res.balance);
      setAddress(res.wallet.classicAddress)
    console.log(res)
    });
  }

  xumm.user.account.then(account => {
    setAddress(account ?? '');
  })
  
  xumm.environment.jwt?.then(j => {
    setAppName(j?.app_name ?? '')
  })

  const createPayload = async (deposite: number) => {
    const payload = await xumm.payload?.createAndSubscribe({
      TransactionType: 'Payment',
      Destination: 'rUWXNx95KPpkNZJ2jLeHKnPFaMcDEiECqv',
      Account: address,
      Amount: String(deposite),
    }, event => {
      // Return if signed or not signed (rejected)
      setLastPayloadUpdate(JSON.stringify(event.data, null, 2))

      // Only return (websocket will live till non void)
      if (Object.keys(event.data).indexOf('signed') > -1) {
        return true
      }
    });

    if (payload) {
      setPayloadUuid(payload.created.uuid)
      if (xumm.runtime.xapp) {
        xumm.xapp?.openSignRequest(payload.created)
      } else {
        if (payload.created.pushed && payload.created.next?.no_push_msg_received) {
          setOpenPayloadUrl(payload.created.next.no_push_msg_received)
        } else {
          window.open(payload.created.next.always)
        }
      }
    }

    return payload
  }

  const createChallenge = async () => {
    const res = await axios.post('http://localhost:3333/api/challenge/createChallenge', {
      title: "Hello, World",
      desc: "Hello, World",
      startDate: '2023-09-30',
      endDate: '2023-10-01'
    })
    console.log(res);
  }

  const getAllChallenges = async() => {
    const res = await axios.get('http://localhost:3333/api/challenge/getAllChallenges');
    console.log(res);
    setChallenges(res.data);
  }

  const JoinChallenge = async(challengeId: string, deposite: number) => {
    createPayload(deposite);
    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
    await client.connect();
    const response = await client.request({
        "command": "account_tx",
        "account": address,
    })
    const txHash = response.result.transactions[0].tx.hash;
    console.log(response.result.transactions[0].tx.hash);
    const res = await axios.post('http://localhost:3333/api/challenge/registerChallenge', {
      userId: address,
      challengeId: challengeId,
      txHash: txHash,
      deposite: deposite
    }) 
    console.log(res);
  }

  return (
    <main>
      <Button
        title='Create Wallet'
        onClick={() => {handleCreateAccount()}}
      />
      <Button
        title='Connect Wallet'
        onClick={async () => {
          const res: any = await xumm.authorize();
          console.log(res);
          const account = res.me.account;
          console.log(account);
          setAddress(account);
        }}
      />
      {address ? address : ''}
      <Button
        title='Create Challenge'
        onClick={() => createChallenge()}
      />
      <Button
        title='Get Challenges'
        onClick={() => getAllChallenges()}
      />
      <Button
        title='Send Proof'
        onClick={() => {}}
      />
      <Button
        title='Check Blocks'
        onClick={async () => {
          const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
          await client.connect();
          const res = await client.request({
              "command": "account_tx",
              "account": address,
          })
          console.log(res.result.transactions[0].tx.hash);
        }}
      />
      <Button
        title='Judge Proof'
        onClick={() => {}}
      />
      <Button
        title='Get Payback'
        onClick={() => {}}
      />
      <div>
        {challenges.map((challenge) => {
          return (
            <div key={challenge._id}>
              {challenge.title}
                <Button
                  title='Join Challenge'
                  onClick={async () => {
                    await JoinChallenge(challenge._id, 1500);
                  }}
                />
            </div>
          )
        })}
      </div>
    </main>
  )
}
