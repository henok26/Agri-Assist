import prisma from "../db";
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken';


export const emailVerificationSender= async(req,res)=>{
  const {email} = req.body
  
  if (!email) 
      return res.status(401).json({
      message:"Please give me email"
    })
  
  const verificationCode =await Math.floor(Math.random() * 900000) + 100000;

  try {
  const user = await prisma.user.update({
    where: { email: email },
    data: { verificationCode: verificationCode },
  });
  if (!user) {
    return res.status(402).json({
      message: `Could not update user with email ${email}`,
    });
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
    subject: `Email verification code for ${user.username}`,
    text: `Welcome to Exact Betting Tips ${user.username}, your email verification code is ${verificationCode}. Use this code to verify your account.`,
  };

  const info = await transporter.sendMail(message);
  if (!info.accepted || info.accepted.length === 0) {
    return res.status(400).json({
      message: 'Failed to send email or email is not sent!!!',
    });
  }

  return res.status(200).json({
    message: `Email verification code sent successfully to  ${user.username}`,
  });
} catch (error) {
  console.error(error.message);
  return res.status(500).json({
    message: `Internal server error  ${error.message}`,
  });
}
  
  //   try {
  //   const { email } = req.body;

  //   if (!email) {
  //     return res.status(401).json({
  //       message: "Please provide an email address",
  //     });
  //   }

  //   const verificationCode = Math.floor(Math.random() * 900000) + 100000;

  //   const user = await prisma.user.update({
  //     where: {
  //       email: email,
  //     },
  //     data: {
  //       verificationCode: verificationCode,
  //     },
  //   });

  //   if (!user) {
  //     return res.status(402).json({
  //       message: `Could not update user with email ${email}`,
  //     });
  //   }

  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: process.env.senderEmail,
  //       pass: process.env.passwordEmail,
  //     },
  //     tls: {
  //       rejectUnauthorized: false,
  //     },
  //     // Set the timeout to 30 seconds
  //     // This will cause the sendMail method to throw an error if it takes more than 30 seconds to connect to the email server
  //     timeout: 30000,
  //   });

  //   const message = {
  //     from: process.env.senderEmail,
  //     to: email,
  //     subject: `Email verification code for ${user.username}`,
  //     text: `Welcome to Exact Betting Tips ${user.username}, your email verification code is ${verificationCode}. Use this code to verify your account.`,
  //   };

  //   // Add a try-catch block to catch the timeout error
  //   try {
  //     const info = await transporter.sendMail(message);

  //     if (!info.accepted || info.accepted.length === 0) {
  //       return res.status(400).json({
  //         message: "Failed to send email",
  //       });
  //     }

  //     return res.status(200).json({
  //       message: `Email verification code sent successfully to ${user.username}`,
  //     });
  //   } catch (error) {
  //     if (error.code === "ETIMEDOUT") {
  //       return res.status(500).json({
  //         message: "Failed to connect to email server: timed out",
  //       });
  //     } else {
  //       throw error;
  //     }
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({
  //     message: `Internal server error: ${error.message}`,
  //   });
  // }
  
}

export const emailVerificationVerify = async (req, res) => {
  const { email, verificatinCode } = req.body
  if (!email) {
    return res.status(400).json({message:"Please provide me email address"})
  }
  if (!verificatinCode) {
    return res.status(400).json({message:"Please provide me verification code i send you to your email !"})
  }
  try {
    //check if the verification code is correct 
    const user = await prisma.user.findUnique({
      where: {
        email:email,
      }
    })
    console.log(user.verificationCode)
    if (user.verificationCode == verificatinCode) {
      //update user's email status to verified
      const updatedUser = await prisma.user.update({
        where: { email: email },
        data:{isVerified:true}
      })
      if (!updatedUser) {
        return res.status(401).json({message:"Error to perform update verification status on the database"})
      }
      res.status(200).json({
        message:"Email Verified Successfully"
      })
    } else {
     return res.status(402).send('Incorrect verification code.');
    }
  } catch (error) {
     console.error(error);
   return  res.status(500).send('Error verifying email.')
  }
}

export const isVerified=async(req,res)=>{
  const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

   try {
     const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    })
    
    if (!user) {
       return res.status(400).json({
            message:"Only admins can create packages!"
        })
    }
  if (!user.isVerified == true) {
    return res.status(200).json({ message: `User : ${user.username}'s email is not Verified.` })
  }
 res.status(200).json({ message: `User : ${user.username}'s Email is Verified.` })
    
     
   } catch (error) {
    return res.status(500).json({message:`Internal server error or Error with ${error.message}`})
   }
}