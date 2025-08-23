import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import client from '../db/pgsql.js'

export const signup = async (req, res) => {

  const addUser = async (firstName, lastName, email, password) => {
    
    const checkEmail = await client.query(`SELECT email FROM "user" WHERE email = $1`, [email])
    
    if (checkEmail.rows.length > 0)
      return false
    
    const hashedPass = await bcrypt.hash(password, 10)
    
    const result = await client.query(
      `INSERT INTO "user"(firstname, lastname, email, password)
      VALUES ($1, $2, $3, $4) RETURNING user_id`, [firstName, lastName, email, hashedPass]
    )
    const user_id = result.rows[0].user_id
    return user_id
  }
  
  const {firstName, lastName, email, password} = req.body

  const user_id = await addUser(firstName, lastName, email, password)
  if (!user_id)
    return res.status(409).json({error: 'Another account is already using this email!'})

  // jwt and auth

  res.status(200).send()
}


export const signin = async (req, res) => {

  const checkEmail = async (email) => {
    
    const result = await client.query(`SELECT user_id FROM "user" WHERE email = $1`, [email])
    if (result.rows.length === 0)
      return false
    
    return result.rows[0].user_id
  }

  const {email, password} = req.body

  const user_id = await checkEmail(email)
  if (!user_id)
    return res.status(401).json({error: 'Email or password are invalid'})

  const result = await client.query(`SELECT password FROM "user" WHERE user_id = $1`, [user_id])
  const hashedPass = result.rows[0].password
  const isMatch = await bcrypt.compare(password, hashedPass)
  if (!isMatch)
    return res.status(401).json({error: 'Email or password are invalid'})

  // jwt and auth

  res.status(200).send()
}
