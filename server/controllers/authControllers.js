import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'

export const signup = async (req, res) => {

  console.log("In sign up")
  
  res.status(200).send()
}

export const signin = async (req, res) => {

  console.log("In sign in")

  res.status(200).send()
}
