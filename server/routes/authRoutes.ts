import express from "express";

import {
  signUp,
  logIn,
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
  logOut,
} from "../controllers/authControllers";
import authenticationMiddleWare from "../middleware/authMiddleware";

export const router = express.Router();

router.post("/signUp/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await signUp(username, email, password);
    const token = await generateSessionToken(); //token nao é encriptado, sessionId é o token encriptado
    const session = await createSession(token, user.id); // pega no token e no id do user e cria uma sessao na base de dados
    setSessionTokenCookie(res, token, session.expiresAt); // seta o token no cookie, pega na respostae e poe um cookie com o token no header
    res.send(user); // envia o usuario
  } catch (error) {
    console.log(error);

    res.status(500).send("Error signing up user");
  }
});

router.post("/logIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await logIn(email, password);
    const token = await generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(res, token, session.expiresAt);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

router.patch("/logOut", authenticationMiddleWare, async (req, res) => {
  try {
    const sessionId = req.sessionId;
    await logOut(sessionId, res);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("error signing out");
  }
});
