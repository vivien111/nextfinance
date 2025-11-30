import express from "express";
import path from "path";
import sendLoanApplicationRouter from "./routes/sendLoanApplication";

const app = express();
app.use(express.json());

// API
app.use("/api/sendLoanApplication", sendLoanApplicationRouter);

// Frontend Vite build
const buildPath = path.join(__dirname, "../dist");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Port dynamique Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
