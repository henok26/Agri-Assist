import { Router } from 'express';
import prisma from './db';
import jwt from 'jsonwebtoken';
import { emailVerificationSender, emailVerificationVerify, isVerified } from './handlers/verifyEmail';
import moment from 'moment';
import { prodictCrop } from './handlers/CropPrediction/CropPRediction';

// import { Subscription } from './handlers/User/subscription';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const router = Router()

//email Verification sender 

router.post('/email-verification-sender', emailVerificationSender)

router.post('/verify-email', emailVerificationVerify)

router.get('/isverified', isVerified)
router.post('/predict' , prodictCrop)
//router.post('/create-sbscription', Subscription)

//Admin can delete user
router.post('/delete-user', async (req, res) => {
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
    console.error(error);
    return res.status(500).json({
      Message: `There was an error: ${error.message}`,
    });
  }
});

//Get All Package , admin and users can get a list of created packages
router.get('/package-list', async (req, res) => {
      const accessToken = req.header('Authorization').replace('Bearer ', '');
    
  if (!accessToken) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const allPakcages = await prisma.package.findMany({})
    if (!allPakcages) {
        return res.status(400).json({messge:`There is no any packages`})
    }
    return res.status(200).json({ listOfPackage  : `packages to be purchased by : ${decoded.username}`, allPakcages})
 })

 //UPdate package by the admin,in order to create package the admin musts be login in the admin dashboard
router.post('/package', async(req, res) => {
// router.put('/package/:id', async(req, res) => {
    const { packageId ,pakcageName,packagePrice , accessToken } = req.body
    // const {packageId} = req.parmas

     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,

        },
        select: {
            isAdmin:true
        }
    })
    if (!user) {
        res.status(400).json({Message:"You are using invalid Token ,or the token is expired ,please provide valid token"})
    }

    const induvidualPackage = await prisma.package.update({
        where: {
          id:packageId
        }, data: {
            name: pakcageName,
            price: packagePrice,
      }
    })
    if (!induvidualPackage) {
        res.status(400).json({Message:"Error updateing the package"})
    }
    
})

//Create pakcage only by adims,in order to create package the admin musts be login in the admin dashboard
router.post('/package-create', async (req, res) => {
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
})

//Delete the package using package id 
router.post('/package/:id', async(req, res) => {
    //to delete the package using the package id
    // const { packageId } = req.params
    const { packageId } = req.body
    if (!packageId) {
        return res.status(400).json({message:"Please provide me package id "})
    }

    const pacageDelete = await prisma.package.delete({
        where: {
            id:packageId
        }
    })
    if (!pacageDelete) {
        res.status(400).json({
             Message: "Error Deleting the package"
        })
    }
    res.status(200).json({
        Message:"Succussfully Deleted the Package"
    })
})

router.post('/pay', async (req, res) => {
   const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
          {customer: customer.id},
          {apiVersion: '2022-11-15'}
        );

        res.json({
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey:process.env.STRIPE_PUBLISHABLE_KEY
        })
})

//Create payment intent in the stripe and save the payment intent to the postgresql db 
router.post("/create-payment-intent", async (req, res) => {
    const { userId, packageId , currrency } = req.body
    const user = await prisma.user.findUnique({
        where:{id:userId}
    })
    if (!user) {
        return res.status(400).json({message:`There is no user with this user id :${userId} , please insert valid user id`})
    }
    const packageIdentity = await prisma.package.findUnique({
        where: {
            id:packageId
        }
    })
    console.log(packageIdentity.price)
    const amountPrice= packageIdentity.price
    if (!packageIdentity) {
        return res.status(400).json({messaage:`there is no any package in the database with the given package id : ${packageId} , please use a valid package id !`})
    }
    const today = new Date();
    const oneYearFromNow = new Date(today.setMonth(today.getMonth() + 12));
    if (!currrency) {
        return res.status(400).json({message:"Currency type is needed!!!"})
    }
 try {
   const paymentIntent = await stripe.paymentIntents.create({
    // currency: 'usd',
    currency: currrency,
    amount: amountPrice*100,
   })
     if (!paymentIntent) {
         return res.status(400).json({message:"Error creating the payment in the stripe.try again!!!"})
     }
     const pay = await prisma.payment.create({
         data: {
             
             amount:amountPrice,
             packageName: packageIdentity.name,
             belogsToId: userId,
             packageId: packageIdentity.id,       
             expiresAt: oneYearFromNow.toISOString(),
             stripeClientSecret:paymentIntent.client_secret,
         }    
     })
  res.send({ StripeClientSecret:paymentIntent.client_secret , payedPackageDetail: pay })
 } catch (e) {
   return res.status(500).json({
      message:`Error with internal server or Error with ${e.message}`
    })
 }

});

//give the publishable key for the clinet use
router.get('/config', async(req,res)=>{
    res.json({publishableKey:process.env.STRIPE_PUBLISHABLE_KEY})
})

router.post('/charge', function (req, res) {
    // var stripeToken = request.body.stripeToken;
    const {stripeToken} = req.body;


    const charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "cad",
        card: stripeToken,
        description: "payinguser@example.com"
    }, 
    function(err, charge) { 
        if (err && err.type === 'StripeCardError') {
            console.log("The card has been declined");
        }
    });
});

//show a list of created payments 
router.get('/payment-list', async(req, res) => {
    //to get who payed and what was the payment for  
    const payments = await prisma.payment.findMany({})
    if (!payments) {
        res.status(400).json({Message:"Failed to fetch a list of paymnets from the database , try again."})
    }
    res.status(200).json({List_Of_Payments:payments})

})

//show only one payment by payment id 
router.get('/payment-byid', async(req, res) => {
    //to get who payed and what was the payment for
    // const { paymentId } = req.params
    const {paymentId} = req.body
    
    const payments = await prisma.payment.findUnique({
        where:{id:paymentId}
    })
    if (!payments) {
        res.status(400).json({Message:"Failed to fetch a payment with the given id from the database , try again or use a vaild  payment id ."})
    }
    res.status(200).json({List_Of_Payments:payments})

})

//create payment => a user 
router.post('/payment-create', async (req, res) => {
    const { packageId, price } = req.body
    
    const packageG = await prisma.package.findUnique({
        where: { id: packageId },
    }) 
    if (!packageG) {
        res.status(400).json({
            Message:"There is no any package with the specified id ."
        })
    }
    const packageCreatedAt= packageG.createdAt
    // const expiresAtOneYear = moment('2023-02-18' , 'YYYY-MM-DD').add(365, 'day');
    const expiresAtOneYear = moment(packageCreatedAt,'YYYY-MM-DD').add(365, 'day');

    //token have the neccesery information about the user
    //using the user information retrived from the token the payment can be creted
    //the user must provide  the package information to let the system know which package is paying for ?
    
    //token
    const token = req.header('Authorization').split('Bearer ', '');

    // const token = req.header('Authorization').replace('Bearer ', '');
     if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const belongsToId= decoded.id;
    const paymentCreate = await prisma.payment.create({
        data: {
            packageId: packageId,
            belogsToId: belongsToId,
            amount: price,
            expiresAt: expiresAtOneYear.toLocaleString(),
            packageName: packageG.name
            
        }
    })
      if (!paymentCreate) {
          res.status(400).json({Message:"Error for creating the payment"})
      }
      res.status(200).json({
          Message:`User Id ${belongsToId} Successfully Created Payment for the package Id ${packageId}.`
      })
    
  } catch (error) {
      console.log(error.message)
    res.status(500).send({ error: 'Invalid token.' });
  }
    //token
    
})

//to update payment => to Change the payment 
router.post('/payment-update/', (req, res) => {
    
})

//to cancel payment or to delete payment
router.post('/payment-delete',async (req, res) => {
    // const { paymentId } = req.parmas
    const {paymentId} = req.body
    try {
        const deltePayment = await prisma.payment.delete({
        where:{id:paymentId}
    })
    if (!deltePayment)
        res.status(400).json({
            Message:`Payment Id ${paymentId} doest Exist!!!.`
        })
    res.status(200).json({
        Message:"Payment Deleted Successfully."
    })
    } catch (error) {
        res.status(500).json({
            ErrorMessage:`Failed to Delete Payment `
        })
    }
})

//Who payed => Only Admin 
router.get('/who-payed', async (req, res) => {
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
})

//Who payed for single user => Only Admin 
router.post('/who-payed-id', async (req, res) => {
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
})

export default router;