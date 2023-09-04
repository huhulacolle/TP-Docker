import User from "../models/userModel.js";

export async function createUser(userBody) {
  const newUser = new User(userBody);
  await newUser.save();
}