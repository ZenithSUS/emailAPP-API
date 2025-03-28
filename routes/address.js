import express, { Router } from "express";
import { insertAddress, getAddress } from "../controllers/ip-controller.js";

const router = express.Router();

router.get("/", insertAddress);
router.get("/get-ip", getAddress)

router.get("/test", async (req, res) => {
    return res.status(200).json({
        ...req.headers,
        a: req.get("Remote-Addr"),
        b: req.get("Client-IP"),
        c: req.get("X-Forwared-For"),
        d: req.get("X-Real-IP"),
        e: req.ip,
        h: req.socket.remoteAddress,
    })
})

export default router;