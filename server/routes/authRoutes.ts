import express from "express";

import {
  signUp,
  logIn,
  generateSessionToken,
  createSession,
  validateSessionToken,
  deleteSession,
  setSessionTokenCookie,
  logOut,
} from "../controllers/authControllers";

const routers = express.Router();

routers.get("/signUp/", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await signUp(email, password, username);
    const token = await generateSessionToken(); //token nao é encriptado, sessionId é o token encriptado
    const session = await createSession(token, user.id); // pega no token e no id do user e cria uma sessao na base de dados
    setSessionTokenCookie(res, token, session.expiresAt); // seta o token no cookie, pega na respostae e poe um cookie com o token no header
    res.send(user); // envia o usuario
  } catch (error) {
    res.status(500).send("Error signing up user");
  }
});

routers.get("/logIn", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await logIn(name, password);
    const token = await generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(res, token, session.expiresAt);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

routers.patch("/logOut", async (req, res) => {
  try {
    const { token } = req.body;
    await logOut(token, res);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send("error signing out");
  }
});
