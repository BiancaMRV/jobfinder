import express, {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import Joi, { type ObjectSchema } from "joi";

const router: Router = express.Router();

// Tipagem para os schemas de validação
interface ValidationSchema {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

const validExperienceLevels = ["entry", "mid", "senior", "lead", "executive"];

const validJobTypes = [
  "full-time",
  "part-time",
  "contract",
  "freelance",
  "internship",
  "voluntering",
];

// Middleware de validação genérica
export const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Validar diferentes partes da requisição
    const { error: bodyError } = schema.body?.validate(req.body) ?? {};
    const { error: paramsError } = schema.params?.validate(req.params) ?? {};
    const { error: queryError } = schema.query?.validate(req.query) ?? {};

    // Se houver qualquer erro de validação, retorna uma resposta com status 400
    if (bodyError || paramsError || queryError) {
      console.log("Erro de validação:", bodyError || paramsError || queryError);
      res.status(400).json({
        error: bodyError?.details[0].message || paramsError?.details[0].message,
      });
    } else {
      next(); // Continua para o próximo middleware ou controlador se não houver erros
    }
  };
};

// Validação para atualização de usuário (PUT /users/:id)
export const updateUserValidation: ValidationSchema = {
  params: Joi.object({
    userId: Joi.number()
      .integer()
      .positive() // Para IDs numéricos no PostgreSQL
      .required()
      .messages({
        "number.base": "ID deve ser um número",
        "number.positive": "ID deve ser um número positivo",
        "number.integer": "ID deve ser um número inteiro",
      }),
  }),
  body: Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    age: Joi.number().integer().min(18),
    password: Joi.string().min(6).max(30),
    isWorking: Joi.boolean(),
    currentJob: Joi.string().allow("", null),
  }).min(1),
};

// Validação para obter um usuário com parâmetros de consulta (GET /users/:id)
export const getUserValidation: ValidationSchema = {
  params: Joi.object({
    userId: Joi.string().optional().alphanum().min(3).max(30).messages({
      "string.base": "ID deve ser uma string",
      "string.alphanum": "ID deve conter apenas caracteres alfanuméricos",
      "string.min": "ID deve ter no mínimo {#limit} caracteres",
      "string.max": "ID deve ter no máximo {#limit} caracteres",
      "any.required": "ID é obrigatório",
    }),
  }),
};

export const deleteUserValidation: ValidationSchema = {
  params: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      "number.base": "ID deve ser um número",
      "number.positive": "ID deve ser um número positivo",
      "number.integer": "ID deve ser um número inteiro",
      "any.required": "ID é obrigatório",
    }),
  }),
};

export const createUserValidation: ValidationSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).required(),
  }),
};

export const createCompanyValidation: ValidationSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(500).required(),
  }),
};

export const updateCompanyValidation: ValidationSchema = {
  body: Joi.object({
    company: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(30),
  }).min(1),
};

export const deleteCompanyValidation: ValidationSchema = {
  params: Joi.object({
    companyId: Joi.number().integer().positive().required(),
  }),
};

export const searchCompanyValidation: ValidationSchema = {
  params: Joi.object({
    query: Joi.string().min(3).max(30).required(),
  }),
};

export const getCompanyById: ValidationSchema = {
  params: Joi.object({
    companyId: Joi.number().integer().positive().required(),
  }),
};
export const getCompanyAllJobOffers: ValidationSchema = {
  params: Joi.object({
    companyId: Joi.number().integer().positive().required(),
  }),
};
export const getAllJobOffersValidation: ValidationSchema = {
  params: Joi.object({
    jobOfferId: Joi.number().integer().positive().required(),
  }),
};
export const getJobOfferByIdValidation: ValidationSchema = {
  params: Joi.object({
    jobOfferId: Joi.number().integer().positive().required(),
  }),
};
export const createNewJobOfferValidation: ValidationSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(30).required(),
    location: Joi.string().min(3).max(30).required(),
    logo: Joi.string().min(3).max(500).required(),
    description: Joi.string().min(3).max(500).required(),
    experienceLevelId: Joi.array()
      .items(Joi.string().valid(...validExperienceLevels))
      .required(),
    jobTypeId: Joi.array()
      .items(Joi.string().valid(...validJobTypes))
      .required(),
    salary: Joi.number().integer().positive().required(),
    companyId: Joi.number().integer().positive().required(),
  }),
};
export const deleteJobOfferValidation: ValidationSchema = {
  params: Joi.object({
    jobOfferId: Joi.number().integer().positive().required(),
  }),
};
export const updateJobOfferValidation: ValidationSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(500),
    jobOfferId: Joi.number().integer().positive(),
  }).min(1),
};
export const getJobOfferByExperienceLevelValidation: ValidationSchema = {
  params: Joi.object({
    experienceLevelId: Joi.number().integer().positive().required(),
  }),
};
export const getJobOfferByJobTypeValidation: ValidationSchema = {
  params: Joi.object({
    jobTypeId: Joi.number().integer().positive().required(),
  }),
};
export const getJobOfferBySalaryRangeValidation: ValidationSchema = {
  params: Joi.object({
    salary: Joi.number().integer().positive().required(),
  }),
};

export const getJobOffers: ValidationSchema = {
  query: Joi.object({
    minSalary: Joi.number().optional(),
    maxSalary: Joi.number().optional(),
    jobType: Joi.string()
      .optional()
      .allow("")
      .custom((value) => {
        const jobTypes = value.split(",");

        if (jobTypes.some((type: any) => !validJobTypes.includes(type))) {
          throw new Error("Invalid job type");
        }
        return jobTypes;
      }),
    experienceLevel: Joi.string()
      .optional()
      .allow("")
      .valid("entry", "mid", "senior", "lead", "executive")
      .custom((value) => {
        const experienceLevels = value.split(",");

        if (
          experienceLevels.some(
            (level: any) => !validExperienceLevels.includes(level)
          )
        ) {
          throw new Error("Invalid experience level");
        }
        return experienceLevels;
      }),
  }),
};

export const getApplicationByIdValidation: ValidationSchema = {
  params: Joi.object({
    applicationId: Joi.number().integer().positive().required(),
  }),
};
export const createNewApplicationValidation: ValidationSchema = {
  body: Joi.object({
    userId: Joi.number().integer().positive().required(),
    jobOfferId: Joi.number().integer().positive().required(),
    resume: Joi.string().min(3).max(500).required(),
  }),
};
export const deleteApplicationValidation: ValidationSchema = {
  params: Joi.object({
    applicationId: Joi.number().integer().positive().required(),
  }),
};
export const updateApplicationCoverLetterValidation: ValidationSchema = {
  body: Joi.object({
    coverLetter: Joi.string().min(3).max(500).required(),
    applicationId: Joi.number().integer().positive().required(),
  }),
};
export const updateApplicationResumeValidation: ValidationSchema = {
  body: Joi.object({
    resume: Joi.string().min(3).max(500).required(),
    applicationId: Joi.number().integer().positive().required(),
  }),
};
export const updateApplicationStatusValidation: ValidationSchema = {
  body: Joi.object({
    status: Joi.string().min(3).max(30).required(),
    applicationId: Joi.number().integer().positive().required(),
  }),
};
