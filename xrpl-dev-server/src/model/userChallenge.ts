import mongoose, { Schema } from "mongoose";
import { IUserChallenge } from "../interface/IUserChallenge";

const UserChallengeSchema: Schema<IUserChallenge> = new Schema({
  challengeId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  isSucceed: { type: Boolean, required: true },
  submitDate: { type: Date, required: true }
})

const UserChallenge = mongoose.model<IUserChallenge>('UserChallenge', UserChallengeSchema);
export default UserChallenge;