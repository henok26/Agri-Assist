import jwt from 'jsonwebtoken';
import moment from 'moment';
import prisma from '../../db';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/*...........Package Start.............*/
//user can show the list of packages
export const listOfPackage = async (req, res) => {
    
}
//chak if signed in user  purchased a package
export const userPurchasedPackage = async (req, res) => {
    
}

/*...........Package End.............*/



/*...........Payment Start.............*/

//Create payment intent in the stripe and save the payment intent to the postgresql db 
export const createPaymentIntent=async (req, res) => {
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

}

//give the publishable key for the clinet use
export const getStripePublishableKey= async(req,res)=>{
    res.json({publishableKey:process.env.STRIPE_PUBLISHABLE_KEY})
}

export const StripeCharge = async (req, res) => {
    // var stripeToken = request.body.stripeToken;
    const {stripeToken} = req.body;


    const charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "card",
        card: stripeToken,
        description: "payinguser@example.com"
    }, 
    function(err, charge) { 
        if (err && err.type === 'StripeCardError') {
            console.log("The card has been declined");
        }
    });
}

//show a list of created payments 
export const paymentList= async(req, res) => {
    //to get who payed and what was the payment for  
    const payments = await prisma.payment.findMany({})
    if (!payments) {
        res.status(400).json({Message:"Failed to fetch a list of paymnets from the database , try again."})
    }
    res.status(200).json({List_Of_Payments:payments})
}

//show only one payment by payment id 
export const paymentById= async(req, res) => {
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

}

//create payment => a user 
export const paymentCreateUser= async (req, res) => {
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
    
}

//to update payment => to Change the payment 
export const updatePayment=async(req, res) => {
    
}

//to cancel payment or to delete payment
export const canelPayment =async (req, res) => {
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
}

/*...........Payment End.............*/

