import jwt from 'jsonwebtoken';
import prisma from '../../db';

/*..........Package Interaction...........*/

//Admin Create package
export const packageCreate = async (req, res) => {
    const { name, price, timePeriod } = req.body
    //Only the adim can create packages
     const accessToken = req.header('Authorization').replace('Bearer ', '');
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"Only admins can create packages!"
        })
    }
    
    try {
    const packageCreate = await prisma.package.create({
    data: {
      name: name,
      price: price,
      timePeriod: timePeriod,
    }
  });
  return res.status(200).json({ PackageCreated: packageCreate });
    } catch (error) {
         if (error.code === 'P2002' && error.meta.target.includes('name')) {
            return res.status(400).json({ Message: 'A package with the same name already exists' });
            }
    return res.status(500).json({ Message: 'Error creating the package' });
    }
}
//Admin Update Package 
export const packageUpdate = async (req, res) => {
    const { name, price, timePeriod , packageId } = req.body
    //Only the adim can create packages
     const accessToken = req.header('Authorization').replace('Bearer ', '');
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"Only admins can create packages!"
        })
    }
    
    try {
      const packageUpdate = await prisma.package.update({
        where: {
        id:packageId
      },
    data: {
      name: name,
      price: price,
      timePeriod: timePeriod,
    }
  });
  return res.status(200).json({ PackageCreated: packageCreate });
    } catch (error) {
         if (error.code === 'P2002' && error.meta.target.includes('name')) {
            return res.status(400).json({ Message: 'A package with the same name already exists' });
            }
    return res.status(500).json({ Message: 'Error creating the package' });
    }
}


/*..........Package Interaction...........*/





/*..........Payment Interaction...........*/

//Who payed => Only Admin 
export const payedCustomers = async (req, res) => {
    const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"Only admins can create packages!"
        })
    }
    const payedUsers = await prisma.payment.findMany({
        include: {
            Package: true,
            belongsTo:true
        },
    })
    if (!payedUsers) {
        return res.status(400).json({message:"There is no any payed Cusomers right now!!"})
    }
     res.status(200).json(
          {Message:`How Many Users Payed : ${payedUsers.length}`, payedUsers : payedUsers  }
    )
}

//Who payed for single user => Only Admin 
export const PayedSingeUser=async (req, res) => {
    const { userId } = req.body
    
    const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"Only admins can create packages!"
        })
    }
    if (!userId) {
        return res.status(400).json({message:"User ID is required or please provide a valid user id !!!"})
    }
    const userById = await prisma.payment.findMany({
        where: {
          belogsToId:userId  
        },
        include: {
            Package: true,
            belongsTo:true
        },
    })
    if (!userById) {
        return res.status(400).json({message:"There is no any payed Cusomers right now!!"})
    }
     res.status(200).json(
          {Message:`How Many Users Payed : ${userById.length}`, payedUsers : userById  }
    )
}

/*..........Paymnet Interaction...........*/



/*..........User Interaction...........*/

//Admin Get The list of users
export const listUser = async (req, res) => {
   const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
        select: {
            isAdmin: true
        }
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"You cant! , Only admins can View List of Users!"
        })
    }
  try {
    const listOfUser = await prisma.user.findMany({})
  if (!listOfUser) {
    return res.status(400).json({ message: "There is no registered user" })
    
  }
    return res.status(200).json({listOfUser:listOfUser})
  } catch (error) {
    return res.status(500).json({message:`Error with the internal server or ${error.message}`})
  }

}
//Admin Get the detail of one user usign the user id
export const userShow = async(req, res) => {
  const { userId } = req.body

  const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
        select: {
            isAdmin: true
        }
    })
    
    if (!user || !user.isAdmin) {
       return res.status(400).json({
            message:"You cant! , Only admins can View List of Users!"
        })
    }
  try {
    const user = await prisma.user.findUnique({
      where:{id:userId}
    })
    if (!user) {
      return res.status(400).json({message:"There is no user with the given user id,Please use a valid user!!!!"})
    }
    return res.status(200).json({message:`A detail about user :${user.username} : ${user}`})
  } catch (error) {
       return res.status(500).json({message:`Error with the internal server or ${error.message}`})
  }
}

//Admin Update the user using the user id 
export const updateUser = async (req, res) => {
    const { userId ,username , phone , isAdmin ,email} = req.body
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username,
        isAdmin: isAdmin,
        phone: phone,
        email: email,
      }
    })
    if (!user) {
      return res.status(400).json({message:"There is no user with the given user id,Please use a valid user!!!!"})
    }
    return res.status(200).json({message:`A Updated detail about user :${user.username} : ${user}`})
  } catch (error) {
       return res.status(500).json({message:`Error with the internal server or ${error.message}`})
  }
}
//Admin Delete User by admin
export const deleteUser = async (req, res) => {
    const { userId } = req.body;
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminUsr = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!adminUsr || !adminUsr.isAdmin) {
      return res.status(401).json({
        Message: 'The user is not admin, please sign in as an admin!',
      });
    }

    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userToDelete) {
      return res.status(404).json({ Message: 'User not found' });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      Message: 'The user was deleted successfully!',
      deletedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      Message: `There was an error: ${error.message}`,
    });
  }
}

/*..........User Interaction...........*/ 




