import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import client from "../config/database";
import bcrypt from "bcrypt";
import { sha256 } from "@oslojs/crypto/sha2";
import type { Response } from "express";

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      "INSERT INTO users(name,email,password) VALUES ($1,$2,$3)",
      [name, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.log("user not created", error);
    throw new Error("user not created");
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  } catch (error) {
    console.error("user doesnt exist", error);
    throw new Error("user doesnt exist");
  }
};
export function setSessionTokenCookie(
  response: Response,
  token: string,
  expiresAt: Date
): void {
  if (process.env.NODE_ENV === "production") {
    // When deployed over HTTPS
    response.setHeader(
      "Set-Cookie",
      `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;` // Path =/ significa que o cookie é valido para todo o site
    );
  } else {
    // When deployed over HTTP (localhost)
    response.setHeader(
      "Set-Cookie",
      `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/` //session é o nome do cookie, session vai ser igual ao conteudo do token
    );
  }
}

export function deleteSessionTokenCookie(response: Response): void {
  if (process.env.NODE_ENV === "production") {
    // When deployed over HTTPS
    response.setHeader(
      "Set-Cookie",
      "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;"
    );
  } else {
    // When deployed over HTTP (localhost)
    response.setHeader(
      "Set-Cookie",
      "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/" // max-age=0 significa que o cookie é invalidado, tipo o expires at de uma cookie ou seja idade de um cookie
    );
  }
}

export const generateSessionToken = async () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  //encodeBase32LowerCaseNoPadding(bytes): Esta função pega nos bytes aleatórios e
  //converte-os num token de sessão, transformando os valores binários em texto
  //com Base32, usando caracteres minúsculos e sem adicionar padding
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (token: string, userId: number) => {
  try {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token))
    );

    const session: Session = {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //1 mes
    };

    await client.query(
      "INSERT INTO sessions(id, user_id, expires_at) VALUES ($1, $2, $3)",
      [session.id, userId, session.expiresAt]
    );

    return session;
  } catch (error) {
    console.log("Session creation failed", error);
    throw new Error("Session creation failed");
  }
};

export const validateSessionToken = async (token: string) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  try {
    const result = await client.query("SELECT * FROM session WHERE id=$1", [
      sessionId,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    const session: Session = {
      id: result.rows[0].id,
      userId: result.rows[0].user_id,
      expiresAt: new Date(result.rows[0].expires_at),
    };

    if (Date.now() >= session.expiresAt.getTime()) {
      await deleteSession(sessionId);
      return null;
    }

    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      await client.query("UPDATE sessions SET expires_at=$1 WHERE id=$2", [
        session.expiresAt,
        sessionId,
      ]);
    }

    return session;
  } catch (error) {
    console.log("error validating session", error);
    throw new Error("session not found");
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    await client.query("DELETE FROM sessions WHERE id=$1", [sessionId]);
  } catch (error) {
    console.log("Session deleted", error);
    throw new Error("Session deleted");
  }
};

export const logOut = async (token: string, response: Response) => {
  try {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token))
    );
    await client.query("DELETE FROM sessions WHERE id=$1", [sessionId]);
    deleteSessionTokenCookie(response);
  } catch (error) {
    console.log("log out unsuccessful");
    throw new Error("log out unsuccessful");
  }
};

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export interface Session {
  id: string;
  userId: number;
  expiresAt: Date;
}

export interface User {
  id: number;
}
