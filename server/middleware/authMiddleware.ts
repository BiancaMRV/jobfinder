import type { Request, Response, NextFunction } from "express";
import { validateSessionToken } from "../controllers/authControllers";

const authenticationMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.session;
    if (!token) {
      res.status(401).json({ message: "Token não fornecido." }); // se o token for invalido ou expirado
      return;
    }

    const session = await validateSessionToken(token);
    if (!session) {
      res.status(401).json({ message: "Sessão inválida ou expirada." });
      return;
    }

    req.userId = session.userId; // adiciona o id do usuário ao request
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
};
export default authenticationMiddleWare;
