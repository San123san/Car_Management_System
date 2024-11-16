import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Fix for __dirname in ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Define the path to your built frontend (Vite's output directory)
const frontendBuildPath = path.join(__dirname, '../frontend/dist'); // Adjust path if needed

// Serve static files (e.g., JS, CSS, images, etc.) from the Vite build output
app.use(express.static(frontendBuildPath));

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

// Catch-all route to serve index.html for all other requests
app.get('*', (req, res) => {
  // For all routes that are not part of the API, return the index.html
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

export {app}


