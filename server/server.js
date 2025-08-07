import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/authRouter.js'

const app = express()

const port = 4000

app.use(express.json())

app.get('/', (req, res) => res.send('Server is up'))

app.use('/api/blog', authRouter)

app.listen(port, () => console.log(`Server is up running on port ${port}`))