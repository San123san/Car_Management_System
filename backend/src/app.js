import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({limit: "50mb"}))   //data take when fill form in the format of json
app.use(express.urlencoded({extended: true, limit:"50mb"}))
// app.use(express.static("public"))
// Serve static assets from the public folder (images, documents, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser())

// Serve static files from Vite build (dist folder)
if (process.env.NODE_ENV === 'production') {
    // Set the static folder to 'dist' (which is where your Vite build files are)
    app.use(express.static(path.join(__dirname, 'dist')));
  
    // For any route that doesn't match an API route, serve the React index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }


// routes import
import userRouter  from './routes/users.routes.js'
import carRouter from './routes/car_product.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/carProduct", carRouter)


export {app}
