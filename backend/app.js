import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";
import authRouter from "./routers/authRouter.js"


const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));




app.use(cookieParser())
app.use('/auth', authRouter)





export { app }