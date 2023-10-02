## supersuqad-xrpl

This is supersquad xrpl-dev repositotry. 

### Flow 

**User Side**

1. The user creates a wallet or logs in to it.

2. Check the Challenge that is currently open.

3. Register for an open challenge.
> - Transfer XRP to Supersquad account.
> - Send the TxHash that transferred the XRP to the server.

4. Users who participate in the challenge can press the Challenge achieve button once a day.

5. When the challenge period ends, the XRP deposited into the Supersquad account based on the final achievement rate will be returned.

**Admin Side**

1. Admin can create a challenge.

2. When Admin creates a Challenge, a new Supersquad account is created for that Challenge.

3. When a user registers with the Challenge, Admin checks whether the user participates in the Challenge based on the balance and TxHash of the Supersquad account.

4. Admintr if the user is confirmed to register with Challenge
> - The Escrow automatically transfers the XRP tied to Escrow to Destination address if both requirements are met.
> - Wait for Cancel Escrow if either of them is not met.

5. When a user clicks the Challenge Achieve button once a day, Admin determines whether the user has actually achieved the Challenge and makes a Finalize.

6. If the user's challenge is 80% or more, Finish Escrow returns XRP to those users.

7. If it is less than 80%, the funds are returned to the Supersquad account through Cancel Escrow, calculated according to the deposit amount, and returned to users who achieved 100%.

### Escrow

1. When a challenge is created, an Escrow Account is created through Transaction of the EscrowCreate type as many users participating in the challenge with the Supersquad account.

2. At this time, Escrow Account can expire under two conditions, with the first being time and the second being a separate condition. We will use both conditions.

3. The Escrow Account has a field called Destination, which is the account in which the XRPL deposited in the Escrow Account will be transferred upon expiration of the Escrow Account.

4. If the user's challenge achievement rate is less than 80%, Supersquad's account generates Escrow Cancel Tx for that Escrow Account.

5. When an Escrow Cancel Tx is created for an Escrow Account, the XRPL deposited in that Escrow Account is returned to the account that created the EscrowCreate Tx.

6. If the user's challenge achievement rate is more than 80%, Supersquad's account creates Escrow Finish Tx, and XRPL deposited in Escrow Account is transferred to the user's account.

7. Finally, Supersquad's account has XRPLs received from accounts with a challenge achievement rate of less than 80%. This is additionally transferred to the user's account with a 100% Challenge achievement rate according to the deposit ratio of each participant.

### SuperSquad XRP Module

**createXrplAccount**

```javascript
/**

- @name createXrplAccount
-
-
- @description
- 1. when user doesn't have XRPL Account will call createXrplAccount function;
- 2. when admin create new challenge will call createXrplAccount and going to manage challenge through this account;
 */

```
**createTrustline**
```javascript
/**
 * @name createTrustline
 * 
 * @param userIssuer @type string;
 * @param maxAmount @type number
 * 
 * @description
 * 1. when user trying to join supersquad challenge without XRP user must set trustline to current challenge account 
 */
```

**createChallenge**
```javascript
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

```

**validateUserTx**
```javascript

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
```

**createEscrow**
```javascript
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
```

**cancelEscrow**
```javascript
/**
 * @name cancelEscrow
 * 
 * @param escrowAddress @type string
 * 
 * @description
 * 1. if user didn't achieved their challenge the condition will not satisfied and 
 * after the time condition expired supersquad server will cancel this escrow
 */

```

**finishEscrow**
```javascript
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
```

**sendPayment**
```javascript
/**
 * @name sendPayment
 * 
 * @param userIssuer @type string
 * @param deposite @type number
 * 
 * @description
 * 1. when user trying to join supersquad challenge with XRP user will send XRP to current challenge
 */
```

**joinChallenge**
```javascript
/**
 * @name joinChallenge
 * 
 * @param userIssuer @type string
 * @param challengeId @type string
 * @param deposite @type number
 * @param maxAmount @type number
 * @param type @type boolean
 * 
 * @description
 * 1. user can decide two way to join supersquad challenge
 * 1-1. user can join supersquad challenge with XRP > send payment and send txHash to supersquad server to validate that user will join this challenge
 * 1-2. user can join supersquad challenge without XRP > should set trustline previously
 */
```


#### Current Progress

1. Create Challenge
2. Challenge Inquiry
3. Creating a User Account
4. Connecting a User's Wallet
5. User transfers money to Supersquad account
6. Validation with TxHash and Balance on Supersquad account
