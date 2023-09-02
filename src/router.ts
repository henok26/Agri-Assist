import { Router } from 'express';
import { emailVerificationSender, emailVerificationVerify, isVerified } from './handlers/verifyEmail';


const router = Router()

//email Verification sender 

router.post('/email-verification-sender', emailVerificationSender)

router.post('/verify-email', emailVerificationVerify)

router.get('/isverified', isVerified)


export default router;