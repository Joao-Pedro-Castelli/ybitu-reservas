import { prisma } from "../libs/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

type UserCreateInput = {
    nome: string
    email: string
    data: string | Date
    sexo: string
    telefone: string
    senha: string

}

export const createUser = async (props: UserCreateInput) => {
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
                data: props.data,
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

type LoginInput = {
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

    if(!adult || !adult.user){
        return false;
    }

    if(adult.user.senha === props.senha){
        return true
    }
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
