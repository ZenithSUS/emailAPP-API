import express, { Router } from "express";
import { insertAddress, getAddress } from "../controllers/ip-controller.js";

const router = express.Router();

router.get("/", insertAddress);
router.get("/get-ip", getAddress)

export default router;