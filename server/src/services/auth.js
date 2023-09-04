import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function setUser(userBody) {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  userBody.password = await bcrypt.hash(userBody.password, salt);
  const newUser = new User(userBody);
  await newUser.save();
}

export async function getUser(userBody) {
  const user = await User.findOne({
    username: userBody.username,
  });
  if (!user) throw new Error("Ce compte n'existe pas");

  const verifyPassword = await bcrypt.compare(userBody.password, user.password);

  if (!verifyPassword) throw new Error("Mot de passe incorrect");

  const access_token = jwt.sign(
    {
      sub: user._id,
      username: user.username,
    },
    process.env.JWT, 
    {
      expiresIn: "1h"  
    }
  );

  return {
    access_token: access_token,
  };
}
