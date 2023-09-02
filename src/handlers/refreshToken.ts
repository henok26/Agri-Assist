import prisma from "../db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const refreshToken = async (req, res) => {
     const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found,Please Provide me a refresh token to generate access token for you' });
  }

  // Check if refresh token exists in database
    const token = await prisma.token.findUnique({ where: { value: refreshToken } });
//   const token = await prisma.
    

  if (!token) {
    return res.status(401).json({ message: 'Refresh token not valid' });
  }

  // Verify refresh token and generate new access token with a 2d lifespan
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign({ email: user.email },process.env.JWT_SECRET, { expiresIn: '2d' });
    
    res.json({ accessToken });
  });

}
