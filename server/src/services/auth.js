import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export async function createUser(userBody) {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
  userBody.password = await bcrypt.hash(userBody.password, salt);
  const newUser = new User(userBody);
  await newUser.save();
}