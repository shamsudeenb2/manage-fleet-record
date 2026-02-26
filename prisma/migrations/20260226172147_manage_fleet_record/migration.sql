-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DATA_ENTRY', 'MANAGER');

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('PENDING', 'OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('DIESEL', 'PETROL', 'CNG', 'ELECTRIC', 'LPG', 'OTHER');

-- CreateEnum
CREATE TYPE "TireActionType" AS ENUM ('Installed', 'Rotated', 'Removed', 'OTHER');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('OIL_CHANGE', 'PERIODIC_INSPECTION', 'AIR_FILTER', 'FULL_SERVICE', 'GENERATOR', 'OTHER');

-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RepairPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "TireStatus" AS ENUM ('FITTED', 'REPLACED', 'RETREADED', 'SCRAPPED');

-- CreateEnum
CREATE TYPE "TirePosition" AS ENUM ('FRONT_LEFT', 'FRONT_RIGHT', 'REAR_LEFT_INNER', 'REAR_LEFT_OUTER', 'REAR_RIGHT_INNER', 'REAR_RIGHT_OUTER', 'SPARE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordChangedAt" TIMESTAMP(3),
    "name" TEXT,
    "profileImage" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "licenseNo" TEXT,
    "licenseExp" TIMESTAMP(3),
    "licenseImage" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "guarantorForm" TEXT NOT NULL,
    "fingerPrint" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "vin" TEXT,
    "plateNumber" TEXT NOT NULL,
    "cap_no" TEXT NOT NULL,
    "make" TEXT,
    "vehicleImg" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "fuelType" "FuelType" NOT NULL DEFAULT 'DIESEL',
    "fuelEfficiencyKmPerUnit" DOUBLE PRECISION DEFAULT 2.0,
    "driverId" TEXT,
    "currentOdo" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asssignDate" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TruckDriver" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "from" TIMESTAMP(3),
    "to" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TruckDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "loadingPlant" TEXT NOT NULL,
    "waybill_no" TEXT NOT NULL,
    "atcNo" TEXT NOT NULL,
    "company" TEXT,
    "destination" TEXT NOT NULL,
    "despatchDate" TIMESTAMP(3) NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totaldistanceKm" DOUBLE PRECISION,
    "odoStart" INTEGER,
    "odoEnd" INTEGER,
    "totalFuelCost" DOUBLE PRECISION,
    "totalCO2Kg" DOUBLE PRECISION,
    "costPerKm" DOUBLE PRECISION,
    "status" "TripStatus" NOT NULL DEFAULT 'COMPLETED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "noOfBags" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fuel" (
    "id" TEXT NOT NULL,
    "type" "FuelType" NOT NULL,
    "tripId" TEXT NOT NULL,
    "qtyGiven" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION,
    "fuelCost" DOUBLE PRECISION,
    "distanceKm" DOUBLE PRECISION,
    "estimatedCO2" DOUBLE PRECISION,
    "dieselEquivalentL" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fuel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "repairId" TEXT,
    "name" TEXT NOT NULL,
    "partNumber" TEXT,
    "category" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitCost" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT,
    "supplierPhone" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "fittedDate" TIMESTAMP(3),
    "warrantyExpiry" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT,
    "serviceType" "ServiceType" NOT NULL DEFAULT 'OTHER',
    "status" "ServiceStatus" NOT NULL DEFAULT 'COMPLETED',
    "description" TEXT,
    "odometerKm" INTEGER,
    "nextServiceKm" INTEGER,
    "nextServiceDate" TIMESTAMP(3),
    "laborCost" DOUBLE PRECISION,
    "partsCost" DOUBLE PRECISION,
    "totalCost" DOUBLE PRECISION,
    "garage" TEXT,
    "garagePhone" TEXT,
    "scheduledDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repair" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT,
    "status" "RepairStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "RepairPriority" NOT NULL DEFAULT 'MEDIUM',
    "faultDesc" TEXT NOT NULL,
    "repairDesc" TEXT,
    "odometerKm" INTEGER,
    "laborCost" DOUBLE PRECISION,
    "partsCost" DOUBLE PRECISION,
    "totalCost" DOUBLE PRECISION,
    "garage" TEXT,
    "garagePhone" TEXT,
    "reportedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tire" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "brand" TEXT,
    "size" TEXT,
    "serialNumber" TEXT,
    "position" "TirePosition" NOT NULL DEFAULT 'OTHER',
    "status" "TireStatus" NOT NULL DEFAULT 'FITTED',
    "fittedOdometerKm" INTEGER,
    "removedOdometerKm" INTEGER,
    "kmCovered" INTEGER,
    "treadDepthMm" DOUBLE PRECISION,
    "treadDepthAtRemoval" DOUBLE PRECISION,
    "expectedLifeKm" INTEGER,
    "unitCost" DOUBLE PRECISION,
    "supplier" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "fittedDate" TIMESTAMP(3),
    "removedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Tire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_hashedToken_key" ON "PasswordResetToken"("hashedToken");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_userId_key" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_licenseNo_key" ON "Driver"("licenseNo");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plateNumber_key" ON "Vehicle"("plateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_cap_no_key" ON "Vehicle"("cap_no");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_driverId_key" ON "Vehicle"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_waybill_no_key" ON "Trip"("waybill_no");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_atcNo_key" ON "Trip"("atcNo");

-- CreateIndex
CREATE INDEX "Trip_vehicleId_idx" ON "Trip"("vehicleId");

-- CreateIndex
CREATE INDEX "Trip_driverId_idx" ON "Trip"("driverId");

-- CreateIndex
CREATE INDEX "Trip_status_idx" ON "Trip"("status");

-- CreateIndex
CREATE INDEX "Trip_despatchDate_idx" ON "Trip"("despatchDate");

-- CreateIndex
CREATE INDEX "Part_vehicleId_idx" ON "Part"("vehicleId");

-- CreateIndex
CREATE INDEX "Part_repairId_idx" ON "Part"("repairId");

-- CreateIndex
CREATE INDEX "Part_warrantyExpiry_idx" ON "Part"("warrantyExpiry");

-- CreateIndex
CREATE INDEX "Part_category_idx" ON "Part"("category");

-- CreateIndex
CREATE INDEX "Part_deletedAt_idx" ON "Part"("deletedAt");

-- CreateIndex
CREATE INDEX "Service_vehicleId_idx" ON "Service"("vehicleId");

-- CreateIndex
CREATE INDEX "Service_status_idx" ON "Service"("status");

-- CreateIndex
CREATE INDEX "Service_nextServiceKm_idx" ON "Service"("nextServiceKm");

-- CreateIndex
CREATE INDEX "Service_nextServiceDate_idx" ON "Service"("nextServiceDate");

-- CreateIndex
CREATE INDEX "Service_deletedAt_idx" ON "Service"("deletedAt");

-- CreateIndex
CREATE INDEX "Repair_vehicleId_idx" ON "Repair"("vehicleId");

-- CreateIndex
CREATE INDEX "Repair_status_priority_idx" ON "Repair"("status", "priority");

-- CreateIndex
CREATE INDEX "Repair_deletedAt_idx" ON "Repair"("deletedAt");

-- CreateIndex
CREATE INDEX "Tire_vehicleId_idx" ON "Tire"("vehicleId");

-- CreateIndex
CREATE INDEX "Tire_status_idx" ON "Tire"("status");

-- CreateIndex
CREATE INDEX "Tire_position_idx" ON "Tire"("position");

-- CreateIndex
CREATE INDEX "Tire_deletedAt_idx" ON "Tire"("deletedAt");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TruckDriver" ADD CONSTRAINT "TruckDriver_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TruckDriver" ADD CONSTRAINT "TruckDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fuel" ADD CONSTRAINT "Fuel_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_repairId_fkey" FOREIGN KEY ("repairId") REFERENCES "Repair"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tire" ADD CONSTRAINT "Tire_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
