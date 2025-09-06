import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/mongoose.js';
import { clerkWebhooks } from './controller/webhook.js';
import companyRoutes from './routes/company.routes.js'
import connectCloudinary from './config/cloudinary.js';
import jobRouter from './routes/jobRoutes.js';
import userRouter from './routes/userRoutes.js';
import {clerkMiddleware} from '@clerk/express'

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
await connectDB();
await connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());  // normal JSON parser
app.use(express.urlencoded({ extended: true })); // for form data
app.use(clerkMiddleware())

// Routes
app.use('/api/company', companyRoutes);
app.use('/api/jobs',jobRouter)
app.use('/api/user',userRouter)

// Clerk webhooks (raw body required)
app.post(
  '/webhooks',
  express.raw({ type: 'application/json' }),
  clerkWebhooks
);


app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT}`)
);
