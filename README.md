### Flow 

1. 하나의 Challenge가 생성될 때 Supersquad 계정으로 Challenge에 참여하고 있는 사용자의 수만큼 EscrowCreate Type의 Transaction을 통해 Escrow Account를 생성한다.

2. 이때, Escrow Account는 두 가지 조건에 따라 만료될 수 있으며, 첫 번째는 시간, 두 번째는 별도의 Condition이다. 우리는 두 가지 조건을 모두 사용할 것이다.

3. Escrow Account에는 Destination이라는 필드가 존재하며, 이는 Escrow Account 만료 시 Escrow Account에 예치된 XRPL이 송금될 Account이다.

4. 만일 사용자의 Challenge 달성률이 80% 미만일 경우 Supersquad의 계정은 해당  Escrow Account에 대해 Escrow Cancel Tx를 생성한다.

5. Escrow Account에 대해 Escrow Cancel Tx가 생성되면 해당 Escrow Account에 예치된 XRPL은 EscrowCreate Tx를 생성한 Account로 반환된다.

6. 사용자의 Challenge 달성률이 80% 이상일 경우 Supersquad의 계정은 해당 사용자의 Acocunt와 매핑된 Escrow Account는 Escrow Finish Tx를 생성하여 Escrow Account에 예치된 XRPL은 사용자의 Account로 송금된다.

7. 최종적으로 Supersquad의 계정에는 Challenge 달성률이 80% 미만인 계정에서 받은 XRPL이 예치되어있다. 이를 각 참여자의 예치금 비율에 따라 Challenge 달성률 100%인 사용자의 Account로 추가로 송금한다.

### API

- '/api'
- '/get'
  2. '/admin/evaluteChallenge'

- '/post'
  1. '/registerChallenge'
  2. '/registerUser'
  3. submitChallenge
  4. '/admin/createChallenge'

- '/patch'
  1. '/updateUser'

- '/delete'
  1. '/deleteUser'
  2. '/deleteChallenge'
