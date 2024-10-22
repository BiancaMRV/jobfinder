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
      return res.status(401).json({ message: "Token não fornecido." }); // se o token for invalido ou expirado
    }

    const session = validateSessionToken(token);
    if (!session) {
      return res.status(401).json({ message: "Sessão inválida ou expirada." });
    }

    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
};
export default authenticationMiddleWare;
