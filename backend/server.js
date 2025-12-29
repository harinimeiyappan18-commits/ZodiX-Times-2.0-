import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import submissionRoutes from "./routes/submissions.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://zodix-times.netlify.app"
}));


