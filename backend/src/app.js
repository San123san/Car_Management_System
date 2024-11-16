import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import path from 'path';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Fix for `__dirname` in ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.json({limit: "50mb"}))   //data take when fill form in the format of json
app.use(express.urlencoded({extended: true, limit:"50mb"}))
app.use(express.static("public"))
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist'))); 
app.use(cookieParser())


// routes import
import userRouter  from './routes/users.routes.js'
import carRouter from './routes/car_product.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/carProduct", carRouter)

// Serve React's index.html for any non-API route (catch-all route)
app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
});
export {app}


