import mongoose, { Schema } from "mongoose";
import { IUserInfo } from './../interface/IUserInfo';

const UserInfoSchema: Schema<IUserInfo> = new Schema({
  name: { type: String, required: true} ,
  address: { type: String, required: true }
})

const UserInfo = mongoose.model<IUserInfo>('UserInfo', UserInfoSchema);
export default UserInfo;