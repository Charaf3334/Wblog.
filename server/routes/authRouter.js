import express from 'express'
import { signin, signup } from '../controllers/authControllers.js'
import { SignInValidation, SignUpValidation } from '../validators/authValidators.js'

const authRouter  = express.Router()

authRouter.post('/signup', SignUpValidation,signup)

authRouter.post('/signin', SignInValidation,signin)

export default authRouter