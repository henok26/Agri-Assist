//For admin previlage middleware 
// const accessToken = req.header('Authorization').replace('Bearer ', '');
    
//   if (!accessToken) {
//     return res.status(401).send({ error: 'Access denied. No token provided.' });
//   }

//     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

//     const user = await prisma.user.findUnique({
//         where: {
//             id: decoded.id,
//         },
//         select: {
//             isAdmin: true
//         }
//     })
    
//     if (!user || !user.isAdmin) {
//        return res.status(400).json({
//             message:"You cant! , Only admins can View List of Users!"
//         })
//     }