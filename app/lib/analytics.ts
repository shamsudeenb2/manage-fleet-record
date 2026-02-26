// src/lib/analytics.ts


import prisma from "@/components/lib/db"; // Your Prisma client import


/**
 * Calculates the total distance covered by a specific vehicle OR driver 
 * within a given date range.
 *
 * @param {object} params - The parameters for the query.
 * @param {string} [params.vehicleId] - ID of the vehicle to query.
 * @param {string} [params.driverId] - ID of the driver to query.
 * @param {string | Date} params.startDate - The starting date (inclusive).
 * @param {string | Date} params.endDate - The ending date (inclusive).
 * @returns {Promise<number>} The total distance in kilometers, or 0 if no trips found.
 */
export async function getTotalDistance(params: {
  vehicleId?: string;
  driverId?: string;
  startDate:  Date;
  endDate:  Date ;
}): Promise<number> {
  const { vehicleId, driverId, startDate, endDate } = params;

  // 1. Input Validation and Logic Constraint
  if (!vehicleId && !driverId) {
    throw new Error("Either vehicleId or driverId must be provided.");
  }
  
  // Ensure dates are valid Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Set end date time to end of day to include all trips on that date
  end.setHours(23, 59, 59, 999);

  // 2. Build the WHERE Clause Dynamically
  let where: any = {
    // A. Date Range Constraint: Use uploadDate or despatchDate for filtering
    despatchDate: {
      gte: start,
      lte: end,
    },
    // B. Status Constraint: Only sum distances for completed trips
    status: 'COMPLETED',
    // C. Data Integrity Constraint: Only count trips where distance is recorded
    distanceKm: {
      not: null, // Ensure distance is not null
      gt: 0,     // Ensure distance is positive
    },
  };

  // D. ID Constraint: Add vehicleId OR driverId to the filter
  if (vehicleId) {
    where.vehicleId = vehicleId;
  } else if (driverId) {
    where.driverId = driverId;
  }

  // 3. Prisma Aggregation Query
  try {
    const result = await prisma.trip.aggregate({
      _sum: {
        distanceKm: true,
      },
      where: where,
    });

    // 4. Return the aggregated sum, default to 0
    return result._sum.distanceKm ?? 0;

  } catch (error) {
    console.error("Prisma aggregation error in getTotalDistance:", error);
    // In a production environment, log the error and return 0 or rethrow a generic error
    throw new Error("Failed to calculate total distance due to a database error.");
  }
}