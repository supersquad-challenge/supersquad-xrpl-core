import mongoose from "mongoose";

export interface IUserInfo {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
  address: string;
}