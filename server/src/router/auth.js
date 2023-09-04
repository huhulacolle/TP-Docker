import { Router } from "express";
import { getUser, setUser } from "../services/auth.js";

const authRouter = Router();

authRouter.post("/auth/signup", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("Vous devez renseigner l'email et le mot de passe");
  }

  try {
    await setUser(req.body);
    return res.status(201).send("Compte crée");

  } catch (error) {
    return res.status(403).send(error.toString());
  }
});

authRouter.post("/auth/signin", async (req, res) => {

  try {
    const token = await getUser(req.body);
    return res.status(201).send(token);

  } catch (error) {
    return res.status(403).send(error.toString());
  }
})

export default authRouter;
