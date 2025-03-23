import express from "express";

import {
  signUp,
  logIn,
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
  getCurrentUser,
  logOut,
} from "../controllers/authControllers";
import authenticationMiddleWare from "../middleware/authMiddleware";

export const router = express.Router();

router.post("/signUp", async (req: any, res: any) => {
  try {
    console.log("Pedido de SignUp recebido:", {
      corpo: req.body,
      cookies: req.cookies,
    });
    const {
      firstName,
      lastName,
      email,

      password,
      confirmPassword,
      role,
      name,
      location,
    } = req.body;

    // if (!firstName || firstName.trim() === "") {
    //   return res.status(400).send("First Name is required");
    // }

    if (!email || email.trim() === "") {
      return res.status(400).send("Email is required");
    }
    if (!password || password.trim() === "") {
      return res.status(400).send("Password is required");
    }

    if (password.length < 8) {
      return res
        .status(400)
        .send("Password must be at least 8 characters long");
    }
    if (password.length > 50) {
      return res
        .status(400)
        .send("Password must be at most 50 characters long");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    const username = `${firstName}${lastName}`;

    const user = await signUp(
      firstName,
      lastName,
      email,
      name,
      password,
      role,
      name,
      location
    );
    const token = await generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(res, token, session.expiresAt);

    res.status(201).json({
      message: "Utilizador criado com sucesso",
      user: {
        username,
        email,
        userId: user.id,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro no signup:", error);

    if (error instanceof Error && error.message) {
      return res.status(400).send("Email already exists");
    }
    res.status(500).send("Error signing up");
  }
});

router.post("/logIn", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || email.trim() === "") {
      return res.status(400).send("Email is required");
    }
    if (!password || password.trim() === "") {
      return res.status(400).send("Password is required");
    }

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

router.get("/user", authenticationMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getCurrentUser(userId);
    res.json(user);
  } catch (error) {
    console.log("Error fetching current user:", error);
    res.status(500).send("error fetching data");
  }
});
