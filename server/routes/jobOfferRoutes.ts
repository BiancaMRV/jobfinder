import express from "express";
import authenticationMiddleWare from "../middleware/authMiddleware";
import { getAllCompaniesByUserId } from "../controllers/companiesControllers";
import { getAllJobOffersFromCompany } from "../controllers/companiesControllers";

export const router = express.Router();

// Rota para obter estatísticas da empresa
router.get(
  "/company-stats",
  authenticationMiddleWare,
  async (req, res, next) => {
    try {
      const userId = req.userId;
      console.log("Buscando estatísticas para o usuário ID:", userId);

      // Primeiro obtenha a empresa do usuário para verificar se existe
      const companyResult = await getAllCompaniesByUserId(String(userId));

      if (!companyResult.rows || companyResult.rows.length === 0) {
        console.log("Nenhuma empresa encontrada para o usuário:", userId);
        // Se não houver empresa, retorne estatísticas vazias
        res.json({
          total_activejobs: 0,
          total_application: 0,
          total_interviews: 0,
        });
        return;
      }

      // Aqui você pode implementar a lógica real para obter estatísticas
      // Por enquanto, retornamos dados de exemplo
      res.json({
        total_activejobs: 0,
        total_application: 0,
        total_interviews: 0,
      });
    } catch (error) {
      console.error("Error fetching job stats:", error);
      next(error);
    }
  }
);

// Rota para obter todas as vagas de uma empresa
router.get("/jobs", authenticationMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Buscando vagas para o usuário ID:", userId);

    // Primeiro obtenha o ID da empresa para este usuário
    const companyResult = await getAllCompaniesByUserId(String(userId));
    console.log("Resultado da busca de empresa:", companyResult.rows);

    if (companyResult.rows && companyResult.rows.length > 0) {
      const companyId = companyResult.rows[0].id;
      console.log("ID da empresa encontrado:", companyId);

      const jobOffers = await getAllJobOffersFromCompany(String(companyId));
      console.log("Vagas encontradas:", jobOffers.rows?.length || 0);

      res.json(jobOffers.rows || []);
    } else {
      console.log("Nenhuma empresa encontrada, retornando lista vazia");
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error retrieving job offers" });
  }
});

export default router;
