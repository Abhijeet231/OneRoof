import { Router } from "express";
import{
    createOrGetChat,
    getMessages,
    sendMessage
} from "../controllers/chat.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";


const router = Router();

router.route()

router.post("/", verifyJWT, createOrGetChat)

router.get("/:chatId/messages", verifyJWT, getMessages);

router.post("/messages", verifyJWT, sendMessage);

export default router;