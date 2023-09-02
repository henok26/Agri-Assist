import { Router } from 'express';
import prisma from './db';
import jwt from 'jsonwebtoken';
import { emailVerificationSender, emailVerificationVerify } from './handlers/verifyEmail';
import moment from 'moment';
import { deleteUser, listUser, updateUser, userShow } from './handlers/Admin/admin';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const router = Router()
//email Verification sender 
router.post('/email-verification-sender', emailVerificationSender)
router.post('/verify-email', emailVerificationVerify)
//Admin can Show a list of Users
router.get('/user-list', listUser)
//Admin can Show a detail of User by using user id 
router.get('/user-byId', userShow)
//Admin can Update user
router.post('/user-update', updateUser)
//Admin can delete user
router.post('/user-delete', deleteUser)

//Adin can create new Package
