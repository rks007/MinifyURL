import express from "express";
import { shortenUrl } from "../controllers/shorten.controller.js";


const router = express.Router();

router.post("/shorten", shortenUrl)




export default router;