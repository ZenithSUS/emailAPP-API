import express from "express";
import { sendToAll } from "../controllers/ip-controller.js";
const router = express.Router();

router.get("/send", sendToAll);

export default router;