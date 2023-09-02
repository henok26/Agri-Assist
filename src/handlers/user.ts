import prisma from "../db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
     try {
        const { email, password ,username ,phone} = req.body;
    // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
     // Check if user already exists
  const existingPhone = await prisma.user.findUnique({
    where: { phone },
  });
     if (existingPhone) {
    return res.status(400).json({ error: "phone number already exist ,please Use another phone number" });
  }
  // Check if userEmail already exists
  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingEmail) {
    return res.status(400).json({ error: "User Email already exists,please use another" });
  }
// Check if username already exists
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return res.status(400).json({ error: "Username already exists,Try another username" });
  }

    const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: await hashPassword(password),
          phone: phone,
          // token: ''
            
        },
    })    
    if (!user) {
        return res.status(400).json({errorMessage:"Faild to register the user"})
    }
       const tokens = createJWT(user)
       
       console.log(tokens.refreshToken)
        //save refreshtoken to database
  await prisma.token.create({
    data: {
      value: tokens.refreshToken,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
     
         res.json({ tokens });
         
     } catch (err) {
        console.log(err);
    res.status(500).json({ error: "Something went wrong with the server" });
    
     }
}

//Create admin 
export const createNewAdminUser = async (req, res) => {
     try {
        const { email, password ,username ,phone} = req.body;
    // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
     // Check if user already exists
  const existingPhone = await prisma.user.findUnique({
    where: { phone },
  });
     if (existingPhone) {
    return res.status(400).json({ error: "phone number already exist ,please Use another phone number" });
  }
  // Check if userEmail already exists
  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingEmail) {
    return res.status(400).json({ error: "User Email already exists,please use another" });
  }
// Check if username already exists
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return res.status(400).json({ error: "Username already exists,Try another username" });
  }

    const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: await hashPassword(password),
          phone: phone,
          isAdmin:true            
        },
    })    
    if (!user) {
        return res.status(400).json({errorMessage:"Faild to register the user"})
    }
       const tokens = createJWT(user)
       
       console.log(tokens.refreshToken)
        //save refreshtoken to database
  await prisma.token.create({
    data: {
      value: tokens.refreshToken,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
     
         res.json({ Message: `Admin user : ${tokens.accessToken.name} Sucessfully Created` ,tokens });
         
     } catch (err) {
        console.log(err);
    res.status(500).json({ error: "Something went wrong with the server" });
    
     }
}

export const signIn = async (req, res) => {

      const { password ,username } = req.body;

 try {
     // Validate input
     if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
  
    // Check if user doesn't exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
  
    if (!existingUser) {
      return res.status(400).json({ error: "There is no registered user with this Username!!!" });
    }
  
      const user = await prisma.user.findUnique({
          where: {
              username: username,
          }
      })
   // Check if user doesn't exists
       if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
      //Check if the user password is valid 
      const isValid = await comparePassword(password, user.password)
      if (!isValid) {
         return res.status(401).json({ errorMessage: 'Please insert the Correct password!!!' })
          
      }
    const tokens = createJWT(user)
    if (!tokens) {
    return  res.status(400).json({Message:"Error Generating Access Token and Refresh Token , Please Try Again."})
    }
  
    //save refreshtoken to database
    const saveTokenToDB = await prisma.token.create({
      data: {
        value: tokens.refreshToken,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    if (!saveTokenToDB) {
      res.status(400).json({Message:"Error Saving Refresh token to the database , Please Try again. "})
    }
    // console.log(tokens.refreshToken)
     return res.status(200).json({tokens})
 } catch (error) {
  return res.status(500).json({ServerError:`Error With Internal server or ${error.message}  `})
 }
}


