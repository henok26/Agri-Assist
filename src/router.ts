import { Router } from 'express';
import prisma from './db';
import jwt from 'jsonwebtoken';
import { emailVerificationSender, emailVerificationVerify, isVerified } from './handlers/verifyEmail';
import moment from 'moment';

// import { Subscription } from './handlers/User/subscription';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const router = Router()

//email Verification sender 

router.post('/email-verification-sender', emailVerificationSender)

router.post('/verify-email', emailVerificationVerify)

router.get('/isverified', isVerified)

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

export default router;