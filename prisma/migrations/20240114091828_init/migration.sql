-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "base";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "transactional";

-- CreateTable
CREATE TABLE "base"."Admin" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "share" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "mobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "base"."Subadmin" (
    "code" TEXT NOT NULL,
    "upLinkCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "share" DOUBLE PRECISION NOT NULL,
    "sessionCommission" DOUBLE PRECISION NOT NULL,
    "matchCommission" DOUBLE PRECISION NOT NULL,
    "mobileCommission" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "limit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subadmin_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "base"."Master" (
    "code" TEXT NOT NULL,
    "upLinkCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "share" DOUBLE PRECISION NOT NULL,
    "sessionCommission" DOUBLE PRECISION NOT NULL,
    "matchCommission" DOUBLE PRECISION NOT NULL,
    "mobileCommission" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "limit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "base"."Superagent" (
    "code" TEXT NOT NULL,
    "upLinkCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "share" DOUBLE PRECISION NOT NULL,
    "sessionCommission" DOUBLE PRECISION NOT NULL,
    "matchCommission" DOUBLE PRECISION NOT NULL,
    "mobileCommission" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "limit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Superagent_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "base"."Agent" (
    "code" TEXT NOT NULL,
    "upLinkCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "share" DOUBLE PRECISION NOT NULL,
    "sessionCommission" DOUBLE PRECISION NOT NULL,
    "matchCommission" DOUBLE PRECISION NOT NULL,
    "mobileCommission" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "limit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "base"."Client" (
    "code" TEXT NOT NULL,
    "upLinkCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "sessionCommission" DOUBLE PRECISION NOT NULL,
    "matchCommission" DOUBLE PRECISION NOT NULL,
    "mobileCommission" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "limit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "base"."AdminLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."SubadminLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubadminLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."MasterLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."SuperagentLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuperagentLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."AgentLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."ClientLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."AdminLedger" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionName" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "kisnekara" TEXT NOT NULL,

    CONSTRAINT "AdminLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."SubadminLedger" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionName" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "kisnekara" TEXT NOT NULL,

    CONSTRAINT "SubadminLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."MasterLedger" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionName" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "kisnekara" TEXT NOT NULL,

    CONSTRAINT "MasterLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."SuperagentLedger" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionName" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "kisnekara" TEXT NOT NULL,

    CONSTRAINT "SuperagentLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."AgentLedger" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionName" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "kisnekara" TEXT NOT NULL,

    CONSTRAINT "AgentLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."ClientLedger" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionName" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "kisnekara" TEXT NOT NULL,

    CONSTRAINT "ClientLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."Session" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."Match" (
    "matchId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dataTime" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "declare" TEXT NOT NULL,
    "wonBy" TEXT NOT NULL,
    "plusMinus" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_code_key" ON "base"."Admin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Subadmin_code_key" ON "base"."Subadmin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Master_code_key" ON "base"."Master"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Superagent_code_key" ON "base"."Superagent"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_code_key" ON "base"."Agent"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Client_code_key" ON "base"."Client"("code");

-- AddForeignKey
ALTER TABLE "base"."Subadmin" ADD CONSTRAINT "Subadmin_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "base"."Admin"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."Master" ADD CONSTRAINT "Master_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "base"."Subadmin"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."Superagent" ADD CONSTRAINT "Superagent_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "base"."Master"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."Agent" ADD CONSTRAINT "Agent_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "base"."Superagent"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."Client" ADD CONSTRAINT "Client_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "base"."Agent"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
