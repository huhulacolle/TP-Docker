import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { setMessages, getMessages } from "../services/message.js";
import jwt_decode from "jwt-decode";


const messageRouter = Router();

messageRouter.get("/", verifyToken, async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  const decoded = jwt_decode(token);

  try {
    const result = await getMessages(decoded.sub);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
})

messageRouter.post("/", verifyToken, async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  const decoded = jwt_decode(token);

  try {
    await setMessages(req.body.message, decoded.sub);
    res.send("Message créé");
  } catch (error) {
    res.status(400).send(error);
  }
})

export default messageRouter;