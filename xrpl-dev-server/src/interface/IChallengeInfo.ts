import mongoose from "mongoose";

export interface IUser {
  id: mongoose.Schema.Types.ObjectId;
  escrow: string;
  achievement: number;
  deposite: number;
}

export interface IChallengeInfo {
  id: mongoose.Schema.Types.ObjectId;
  title: string;
  desc: string;
  users: IUser[];
  startDate: Date;
  endDate: Date;
}