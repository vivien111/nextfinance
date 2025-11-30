import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendEmailRouter from "./routes/sendEmail.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route API
app.use("/api/sendEmail", sendEmailRouter);
// Port dynamique Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
