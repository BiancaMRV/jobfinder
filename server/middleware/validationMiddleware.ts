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
}

// Middleware de validação genérica
export const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Validar diferentes partes da requisição
    const { error: bodyError } = schema.body?.validate(req.body) ?? {};
    const { error: paramsError } = schema.params?.validate(req.params) ?? {};

    // Se houver qualquer erro de validação, retorna uma resposta com status 400
    if (bodyError || paramsError) {
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
    id: Joi.string().alphanum().min(3).max(30).required().messages({
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
