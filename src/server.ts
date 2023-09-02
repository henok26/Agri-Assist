import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
// import { protect, protectRoute, refreshToken } from './modules/auth'
import bcrypt from 'bcrypt'
// import prisma from "../db";
import jwt from 'jsonwebtoken'
import { createNewAdminUser, createNewUser, signIn } from './handlers/user'
import { protectRoute } from './modules/auth'
import { refreshToken } from './handlers/refreshToken'
import { forgotPassword, forgotPasswordChanger } from './handlers/resetPassword'
import { countFaramers, createNewFarmer } from './handlers/User/Farmers/Farmer-Register'

const app = express()

//midlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200)
    res.json({message:'hellooo'})
})



app.use('/api',protectRoute, router)
app.post('/register', createNewUser)
app.post('/register-farmer', createNewFarmer)
app.get('/regitered-farmers', countFaramers)

app.post('/register-admin', createNewAdminUser)

app.post('/signin', signIn)
app.post('/forgot-password', forgotPassword)
app.post('/password-changer', forgotPasswordChanger)


app.get('/refresh-token',refreshToken)


export default app