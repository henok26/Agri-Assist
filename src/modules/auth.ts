import bcrypt from 'bcrypt'
import prisma from "../db";
import jwt from 'jsonwebtoken'

export const comparePassword = (password,hash) => {
    return bcrypt.compare(password,hash)
}
export const hashPassword = (password) => {
    return bcrypt.hash(password,5)
}

export const createJWT = (user) => {

    //access token aand regresh token 
    try {
        const accessToken = jwt.sign({ id: user.id, username: user.username, email: user.email, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '2d' })
    const refreshToken = jwt.sign({
        id: user.id, username: user.username, email: user.email, phone: user.phone
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return { accessToken ,refreshToken}
    } catch (error) {
        console.log("Error :", error)
    
    }
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
      return res.status(401).json({ message: 'not authorized' })
        return
    }

    const [, token] = bearer.split('')
    if (!token) {
        res.status(401).json({ message: 'not valid tokoen 001' })
        return
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'not valid tokoen 002' })
        return
    }
}


//to protect the routes 
export const protectRoute = (req, res, next) => {
    try {
       const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
    res.status(500).json({ Error_Messaage: `Error with internal server or ${error.message} `});
    console.log(error.message)
  }
};