import express from "express";
import urlRoutes from "./routes/url.route.js";
import cors from "cors";
const app = express();


import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { redirectUrl } from "./controllers/redirect.controller.js";
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener API");
});

app.use("/api/v1", urlRoutes);

app.get("/:shortId", redirectUrl)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});