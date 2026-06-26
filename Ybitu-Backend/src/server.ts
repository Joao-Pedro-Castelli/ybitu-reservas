import "dotenv/config";
import express from "express";
import helmet from "helmet";
import MainRouter from "./routes/MainRouter.js";
import { notDefined, serverError } from "./routes/ErrorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const server = express();

// 1. Defina a lista de origens permitidas
const allowedOrigins = [
  'http://localhost:5173', // App Principal (React)
  'http://localhost:5174'  // Painel Admin (React)
];

// 2. Configure o CORS usando uma função para validar a origem
server.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem origem (como ferramentas mobile ou Postman/Insomnia)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true
}));

server.use(cookieParser());
server.use(helmet());
server.use(express.json());

// Seus roteadores normais
server.use("/", MainRouter);
server.use(notDefined);
server.use(serverError);

server.listen(3000, () => {
    console.log("Servidor está rodando em : http://localhost:3000/");
});