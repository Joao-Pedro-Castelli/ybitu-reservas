import express from "express";
import { createUser, loginUser, userData } from "../services/User.js";
import { type LoginInput, isSignupInput } from "../types.js";

const MainRouter = express.Router();

MainRouter.get("/", (_req, res) => {
    res.json({ msg: "Oiii" });
});

// User tries to login
MainRouter.get("/user", async (req: {body: LoginInput} , res) => {
    const login_input = req.body;

     try {
        const user = await loginUser(login_input);

        if (user) {
            return res.json({ msg: "Login realizado com sucesso" });
        }
        return res.json({ msg: "Dados inválidos"});

    } catch (err) {
        console.error(JSON.stringify(err, null, 2));
        throw err;
    }

});

// User tries to signup his info with email and password
MainRouter.post("/user", async (req, res) => {
    console.log("a rota foi chamada");
    const userData = req.body;

    if (isSignupInput(userData)) {
        try {
            const user = await createUser(userData);

            if (user) {
                return res.json({ msg: "Cadastrado com Sucesso" });
            }
            return res.json({ msg: "Usuário já cadastrado" });

        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            throw err;
        }
    }
    return res.status(400).json({ msg: "Campos obrigatorios faltando." });
})

// Client wants the data for a user with requested email
MainRouter.get("/user/data", async (req: {query: {email: string}}, res) => {
    const email = req.query.email;
    console.log("ROTA /user/data FOI CHAMADA");
    console.log("EMAIL:", email);

     try {
        res.json( await userData(email));
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Erro do servidor"});
    }
});

export default MainRouter;
