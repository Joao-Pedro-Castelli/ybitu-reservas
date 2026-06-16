import type { RequestHandler, ErrorRequestHandler } from "express";


export const notDefined: RequestHandler = (_req, res) =>{
    res.status(404).json({ error: "Rota não definida" });
}

export const serverError: ErrorRequestHandler = (err, _req, res, _next) => {
    console.log(err);
    res.status(500).json({error: "Erro no servidor"});
}
