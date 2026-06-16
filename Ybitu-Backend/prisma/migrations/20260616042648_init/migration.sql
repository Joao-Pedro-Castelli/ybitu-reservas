-- CreateEnum
CREATE TYPE "TipoStatus" AS ENUM ('IN', 'OUT', 'EM_ANALISE', 'PAGO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "QuartoStatus" AS ENUM ('OCUPADO', 'MANUTENCAO', 'DISPONIVEL');

-- CreateEnum
CREATE TYPE "QuartoTipo" AS ENUM ('DUPLO', 'TRIPLO', 'QUADRUPLO');

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adulto" (
    "idPessoa" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Adulto_pkey" PRIMARY KEY ("idPessoa")
);

-- CreateTable
CREATE TABLE "Crianca" (
    "idPessoa" INTEGER NOT NULL,
    "idResp" INTEGER NOT NULL,

    CONSTRAINT "Crianca_pkey" PRIMARY KEY ("idPessoa")
);

-- CreateTable
CREATE TABLE "User" (
    "idAdulto" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idAdulto")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "idUser" INTEGER NOT NULL,
    "dataReserva" TIMESTAMP(3) NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "numPessoas" INTEGER NOT NULL,
    "status" "TipoStatus" NOT NULL,
    "valor" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("idUser","dataReserva")
);

-- CreateTable
CREATE TABLE "Acompanhante" (
    "reservaUser" INTEGER NOT NULL,
    "reservaData" TIMESTAMP(3) NOT NULL,
    "idPessoa" INTEGER NOT NULL,

    CONSTRAINT "Acompanhante_pkey" PRIMARY KEY ("reservaUser","reservaData","idPessoa")
);

-- CreateTable
CREATE TABLE "FeedbackUser" (
    "reservaUser" INTEGER NOT NULL,
    "reservaData" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedbackUser_pkey" PRIMARY KEY ("reservaUser","reservaData")
);

-- CreateTable
CREATE TABLE "ReservaQuartos" (
    "reservaUser" INTEGER NOT NULL,
    "reservaData" TIMESTAMP(3) NOT NULL,
    "custo_frigobar" DOUBLE PRECISION NOT NULL,
    "multa" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ReservaQuartos_pkey" PRIMARY KEY ("reservaUser","reservaData")
);

-- CreateTable
CREATE TABLE "Quarto" (
    "numero" INTEGER NOT NULL,
    "tipo" "QuartoTipo" NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "status" "QuartoStatus" NOT NULL,
    "reservaUser" INTEGER,
    "reservaData" TIMESTAMP(3),

    CONSTRAINT "Quarto_pkey" PRIMARY KEY ("numero")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adulto_email_key" ON "Adulto"("email");

-- AddForeignKey
ALTER TABLE "Adulto" ADD CONSTRAINT "Adulto_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crianca" ADD CONSTRAINT "Crianca_idResp_fkey" FOREIGN KEY ("idResp") REFERENCES "Adulto"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crianca" ADD CONSTRAINT "Crianca_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idAdulto_fkey" FOREIGN KEY ("idAdulto") REFERENCES "Adulto"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idAdulto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acompanhante" ADD CONSTRAINT "Acompanhante_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acompanhante" ADD CONSTRAINT "Acompanhante_reservaUser_reservaData_fkey" FOREIGN KEY ("reservaUser", "reservaData") REFERENCES "Reserva"("idUser", "dataReserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackUser" ADD CONSTRAINT "FeedbackUser_reservaUser_reservaData_fkey" FOREIGN KEY ("reservaUser", "reservaData") REFERENCES "Reserva"("idUser", "dataReserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaQuartos" ADD CONSTRAINT "ReservaQuartos_reservaUser_reservaData_fkey" FOREIGN KEY ("reservaUser", "reservaData") REFERENCES "Reserva"("idUser", "dataReserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quarto" ADD CONSTRAINT "Quarto_reservaUser_reservaData_fkey" FOREIGN KEY ("reservaUser", "reservaData") REFERENCES "ReservaQuartos"("reservaUser", "reservaData") ON DELETE SET NULL ON UPDATE CASCADE;
