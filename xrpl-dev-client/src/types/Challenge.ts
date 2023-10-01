export type UserType = {
  _id: string;
  escrow: string;
  achievement: number;
  deposite: number;
}

export type ChallengeType = {
  _id: string;
  title: string;
  desc: string;
  users: UserType[];
  startDate: Date;
  endData: Date;
}