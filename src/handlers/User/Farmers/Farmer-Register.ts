import prisma from "../../../db";
import { createJWT, hashPassword } from "../../../modules/auth";

export const createNewFarmer = async (req, res) => {
    try {
       const { email, password , username , phone } = req.body;
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

   const user = await prisma.farmer.create({
       data: {
         username: username,
         email: email,
         password: await hashPassword(password),
         phone: phone,
        //  token: ''
        // accountType:accountType
       },
   })    
   if (!user) {
       return res.status(400).json({errorMessage:"Faild to register the user"})
   }
      const tokens = createJWT(user)
      
      console.log(tokens.refreshToken)
       //save refreshtoken to database
//  await prisma.token.create({
//    data: {
//     value: tokens.refreshToken,
//     //  user:user.id
//     userId:user.id
//     //  user: {
//     //    connect: {
//     //      id: user.id,
//     //    },
//     //  },
//    },
//  })
    
        res.json({ tokens });
        
    } catch (err) {
       console.log(err);
   res.status(500).json({ error: "Something went wrong with the server" });
   
    }
}

//count the registered farmers

export const countFaramers=async(req,res)=>{
    const count = await prisma.farmer.findMany()
    res.status(200).json({count})
}