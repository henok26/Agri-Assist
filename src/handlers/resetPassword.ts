import prisma from "../db";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { refreshToken } from "./refreshToken";
import { hashPassword } from "../modules/auth";


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({messge:"Email is require ,please provide email!!"})
  }

    try {
        const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const token = await bcrypt.hash(user.id.toString(), 10);

  const userUpdate= await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: token,
      resetTokenExpiry:await new Date(Date.now() + 3600000), // token expires in 1 hour
    },
  });
      if (!userUpdate) {
        return res.status(400).json({
          message : "Error for updating the user!!"
        })
      }
       const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.senderEmail,
      pass: process.env.passwordEmail,
    },
  });

  const message = {
    from: process.env.senderEmail,
    to: email,
    subject: `Email Password Reset Requeset for ${user.username}`, 
    text: `Welcome to Exact Betting Tips ${user.username} , your password reset code is <h1> ${token} </h1>. Use this code to change your forgoten password.Please use the code before `,
  };

  const info = await transporter.sendMail(message);
  if (!info.accepted || info.accepted.length === 0) {
    return res.status(400).json({
      message: 'Failed to send email',
    });
  }

  return res.status(200).json({
    message: `Email verification code sent successfully to  ${user.username}`,
  });
    } catch (error) {
      return res.status(500).json({message:`Error with : ${error.message}`})     
    }
}

export const forgotPasswordChanger = async(req,res) => {
  const { tokenFromEmail ,password} = req.body
  
  //validate the tokenFromEmail
  if (!tokenFromEmail) {
    return res.status(400).json({message:"Please provide the token from the email address."})
  }
  const newPassword= await hashPassword(password)
  try {
    const tokenFromMail = await prisma.user.findFirst({
    where: {
      resetToken:tokenFromEmail
    }
  })

  if (!tokenFromEmail) {
    return res.status(400).json({message:"Please privide a valid token or please note that the token is available only for 1 hour ,try to use it before it expires "})
  }
  const userUPdated = await prisma.user.update({
    where: {
      email: tokenFromMail.email,
    },
    data: {
      password:newPassword,
    }
  })
  return res.status(200).json({message:`Passowrd Sucessfully Changed for user: ${tokenFromMail.username} `})
  } catch (error) {
    return res.status(500).json({message:`Error with the internal server or ${error.message} `})   
  }

}