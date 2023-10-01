import mongoose from "mongoose";

export interface IUserChallenge {
  id: mongoose.Schema.Types.ObjectId;
  challengeId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  isSucceed: boolean;
  submitDate: Date;
}