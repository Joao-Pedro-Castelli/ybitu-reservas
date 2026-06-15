import { prisma } from "../libs/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { isDate } from "node:util/types";

export type UserInput = {
    nome: string
    email: string
    dataNasc: Date
    sexo: string
    telefone: string
    senha: string
}

export function isUserInput(arg: any): arg is UserInput {
    // cannot be null
    if (!arg) {
        return false;
    }
    // needs to have its fields
    if (!arg.nome || !arg.email || !arg.dataNasc || !arg.sexo || !arg.telefone || !arg.senha) {
        return false;
    }
    if (typeof(arg.nome) != "string" || arg.nome != "") {
        return false;
    }
    if (typeof(arg.email) != "string" || arg.email != "") {
        return false;
    }
    if (isDate(arg.dataNasc)) {
        return false;
    }
    if (typeof(arg.telefone) != "string" || arg.telefone != "") {
        return false;
    }
    if (typeof(arg.senha) != "string" || arg.senha != "") {
        return false;
    }

    return true;
}

export const createUser = async (props: UserInput) => {
    const adult = await prisma.adulto.findUnique({
        where: {
            email: props.email
        },
        include: {
            user: true,
            pessoa: true
        }
    });

    if (!adult) {
        const user = await prisma.pessoa.create({
            data: {
                nome: props.nome,
                dataNasc: props.dataNasc,
                sexo: props.sexo,
                adulto: {
                    create: {
                        email: props.email,
                        telefone: props.telefone,
                        user: {
                            create: {
                                senha: props.senha
                            }
                        }
                    }
                }
            }
        })
        return true;
    }

    if (!adult.user) {
        await prisma.user.create({
            data: {
                senha: props.senha,
                idAdulto: adult.idPessoa,
            },
        })
        return true;
    }

    return false;
}

export type LoginInput = {
    email: string,
    senha: string
}

export const loginUser = async (props: LoginInput) => {
    const adult = await prisma.adulto.findUnique({
        where: {
            email: props.email
        },
        include: {
            pessoa: true,
            user: true,
        }
    });

    if(adult?.user?.senha === props.senha){
        return true
    }

    return false;
}

export const userData = async (email: string) => {
    const user = await prisma.adulto.findUnique({
        where: {
            email: email
        },
        include: {
            pessoa: true,
            user: true
        }
    })

    return user;
} 
