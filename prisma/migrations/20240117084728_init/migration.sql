-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ledger";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "login-report";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "report";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "session";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "transaction";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "user"."Admin" (
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
CREATE TABLE "user"."Subadmin" (
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
CREATE TABLE "user"."Master" (
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
    "adminCode" TEXT,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user"."Superagent" (
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
    "adminCode" TEXT,
    "subadminCode" TEXT,

    CONSTRAINT "Superagent_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user"."Agent" (
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
    "adminCode" TEXT,
    "subadminCode" TEXT,
    "masterCode" TEXT,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user"."Client" (
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
    "adminCode" TEXT,
    "subadminCode" TEXT,
    "masterCode" TEXT,
    "superagentCode" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "login-report"."AdminLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login-report"."SubadminLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubadminLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login-report"."MasterLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login-report"."SuperagentLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuperagentLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login-report"."AgentLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login-report"."ClientLoginReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientLoginReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login-report"."AdminReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old" TEXT NOT NULL,
    "new" TEXT NOT NULL,
    "kisnekara" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "AdminReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report"."SubadminReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old" TEXT NOT NULL,
    "new" TEXT NOT NULL,
    "kisnekara" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "SubadminReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report"."MasterReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old" TEXT NOT NULL,
    "new" TEXT NOT NULL,
    "kisnekara" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "MasterReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report"."SuperagentReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old" TEXT NOT NULL,
    "new" TEXT NOT NULL,
    "kisnekara" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "SuperagentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report"."AgentReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old" TEXT NOT NULL,
    "new" TEXT NOT NULL,
    "kisnekara" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "AgentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report"."ClientReport" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old" TEXT NOT NULL,
    "new" TEXT NOT NULL,
    "kisnekara" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "ClientReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger"."AdminLedger" (
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
CREATE TABLE "ledger"."SubadminLedger" (
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
CREATE TABLE "ledger"."MasterLedger" (
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
CREATE TABLE "ledger"."SuperagentLedger" (
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
CREATE TABLE "ledger"."AgentLedger" (
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
CREATE TABLE "ledger"."ClientLedger" (
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
CREATE TABLE "session"."Session" (
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
CREATE TABLE "report"."Match" (
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
CREATE UNIQUE INDEX "Admin_code_key" ON "user"."Admin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Subadmin_code_key" ON "user"."Subadmin"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Master_code_key" ON "user"."Master"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Superagent_code_key" ON "user"."Superagent"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_code_key" ON "user"."Agent"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Client_code_key" ON "user"."Client"("code");

-- AddForeignKey
ALTER TABLE "user"."Subadmin" ADD CONSTRAINT "Subadmin_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "user"."Admin"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Master" ADD CONSTRAINT "Master_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "user"."Subadmin"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Master" ADD CONSTRAINT "Master_adminCode_fkey" FOREIGN KEY ("adminCode") REFERENCES "user"."Admin"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Superagent" ADD CONSTRAINT "Superagent_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "user"."Master"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Superagent" ADD CONSTRAINT "Superagent_adminCode_fkey" FOREIGN KEY ("adminCode") REFERENCES "user"."Admin"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Superagent" ADD CONSTRAINT "Superagent_subadminCode_fkey" FOREIGN KEY ("subadminCode") REFERENCES "user"."Subadmin"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Agent" ADD CONSTRAINT "Agent_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "user"."Superagent"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Agent" ADD CONSTRAINT "Agent_adminCode_fkey" FOREIGN KEY ("adminCode") REFERENCES "user"."Admin"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Agent" ADD CONSTRAINT "Agent_subadminCode_fkey" FOREIGN KEY ("subadminCode") REFERENCES "user"."Subadmin"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Agent" ADD CONSTRAINT "Agent_masterCode_fkey" FOREIGN KEY ("masterCode") REFERENCES "user"."Master"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Client" ADD CONSTRAINT "Client_upLinkCode_fkey" FOREIGN KEY ("upLinkCode") REFERENCES "user"."Agent"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Client" ADD CONSTRAINT "Client_adminCode_fkey" FOREIGN KEY ("adminCode") REFERENCES "user"."Admin"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Client" ADD CONSTRAINT "Client_subadminCode_fkey" FOREIGN KEY ("subadminCode") REFERENCES "user"."Subadmin"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Client" ADD CONSTRAINT "Client_masterCode_fkey" FOREIGN KEY ("masterCode") REFERENCES "user"."Master"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Client" ADD CONSTRAINT "Client_superagentCode_fkey" FOREIGN KEY ("superagentCode") REFERENCES "user"."Superagent"("code") ON DELETE SET NULL ON UPDATE CASCADE;
