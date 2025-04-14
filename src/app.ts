import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import {router as bookRoutes} from './books/books.routes'

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Book Tracker API is running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

