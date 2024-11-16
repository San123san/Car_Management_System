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


app.use(express.json({limit: "50mb"}))   //data take when fill form in the format of json
app.use(express.urlencoded({extended: true, limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Serve the React app's static files from the 'dist' directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);  // ES Module workaround
const distPath = path.resolve(__dirname, '..', 'dist');  // Adjust path if needed (e.g., 'public/dist')

app.use(express.static(distPath));  // Serve static files from the dist directory


// routes import
import userRouter  from './routes/users.routes.js'
import carRouter from './routes/car_product.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/carProduct", carRouter)

// Catch-all route: Any non-API route should return React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));  // Serve the index.html from the Vite build
});

export {app}


