import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import path from 'path';

import { fileURLToPath } from 'url';

const app = express()

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the frontend index.html on unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({limit: "50mb"}))   //data take when fill form in the format of json
app.use(express.urlencoded({extended: true, limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter  from './routes/users.routes.js'
import carRouter from './routes/car_product.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/carProduct", carRouter)

export {app}


