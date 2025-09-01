import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/mongoose.js';
import { clerkWebhooks } from './controller/webhook.js';

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
await connectDB();

// Middleware
app.use(cors());
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// Routes
app.get('/', (req, res) => {
  res.send("API is working fine 🚀");
});
app.post('/webhooks', clerkWebhooks);

app.listen(PORT, () =>
  console.log(`Server is up and running at port ${PORT}`)
);
