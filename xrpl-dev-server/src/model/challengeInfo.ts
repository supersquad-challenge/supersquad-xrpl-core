import mongoose, { Schema } from "mongoose";
import { IChallengeInfo } from "../interface/IChallengeInfo";

const ChallengeInfoSchema: Schema<IChallengeInfo> = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  users: { type: [{
    id: mongoose.Types.ObjectId,
    escrow: String,
    achievement: Number,
    deposite: Number
  }], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
})

const ChallengeInfo = mongoose.model<IChallengeInfo>('ChallengeInfo', ChallengeInfoSchema);
export default ChallengeInfo;