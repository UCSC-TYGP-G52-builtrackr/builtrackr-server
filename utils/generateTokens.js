import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  console.log(token);

  res.cookie("jwt", token, {
    httpOnly: false,
    // secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  
};

export default generateToken;
