import { Router } from "express";
import { createUser } from "../services/auth.js";

const authRouter = Router();

authRouter.post("/auth/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      code: 400,
      message: "Vous devez renseigner l'email et le mot de passe",
    });
  }
  try {
    await createUser(req.body);
    return res.code(201).send("Compte crée");
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: error.message
    });
  }
});

authRouter.get("test")

export default authRouter;
