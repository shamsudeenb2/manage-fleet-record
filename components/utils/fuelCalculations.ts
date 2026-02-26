// /**
//  * Calculates the estimated fuel consumption for a given trip.
//  * @param {('Diesel' | 'CNG')} fuelType - The type of fuel used (e.g., 'Diesel', 'CNG').
//  * @param {('L' | 'kg' | 'SCM')} fuelUnit - The desired unit for the output (Liters, Kilograms, or Standard Cubic Meters).
//  * @param {number} distanceKm - The total distance covered in kilometers.
//  * @returns {number | null} The estimated fuel consumption in the specified unit, or null if the input is invalid.
//  * 
//  */
// // utils/fuelCalculations.js

// /**
//  * Known fuel efficiencies for your specific fleet (based on your fleet data)
//  * Note: CNG is typically measured in kg or SCM, not liters.
//  */
// const EFFICIENCY = {
//   // Diesel: 1 liter goes for 2 km -> 0.5 Liters per km (L/km)
//   DIESEL_L_PER_KM: 0.5,
//   KM_PER_LITER : 2,

//   // CNG (assumed energy equivalence):
//   // We'll use a conservative industry estimate for heavy-duty CNG:
//   // 1 kg of CNG has energy roughly equivalent to 1 liter of diesel.
//   // Assuming a similar efficiency loss for CNG trucks compared to diesel trucks:
//   // CNG_KG_PER_KM: 1 kg / 1.7 km/kg (a common range for trucks)
//   CNG_KG_PER_KM: 0.588, // ~1.7 km/kg
//   KM_PER_KG:3,

//   // CNG conversion: 1 kg of CNG is approximately 1.35 SCM (Standard Cubic Meters)
//   KG_TO_SCM_FACTOR: 1.35,
// };
// export const getEstimatedFuelConsumption = (fuelType, fuelUnit, qtyGiven) => {
//   if (typeof qtyGiven !== 'number' || qtyGiven < 0) {
//     console.error('Invalid distance provided.');
//     return null;
//   }

//   const normalizedFuelType = fuelType.toUpperCase();
//   const normalizedFuelUnit = fuelUnit.toUpperCase();

//   let consumptionPerKm = 0;
//   let estimatedDistance = 0;

//   switch (normalizedFuelType) {
//     case 'DIESEL':
//       // Base consumption is always L/km for diesel
//       consumptionPerKm = EFFICIENCY.KM_PER_LITER;
//       estimatedDistance = qtyGiven * consumptionPerKm;

//         // Diesel consumption in Liters (L)
//         return estimatedDistance;
    

//     case 'CNG':
//       // Base consumption is always kg/km for CNG
//       consumptionPerKm = EFFICIENCY.KM_PER_KG;
//       estimatedDistance = qtyGiven * consumptionPerKm;

//       if (normalizedFuelUnit === 'KG') {
//         // CNG consumption in Kilograms (kg)
//         return estimatedDistance;
//       } else if (normalizedFuelUnit === 'SCM') {
//         // CNG consumption conversion from kg to SCM
//         const consumptionSCM = estimatedDistance * EFFICIENCY.KG_TO_SCM_FACTOR;
//         return consumptionSCM;
//       } else {
//         // CNG is not typically measured in L; return an error or base kg value.
//         console.warn(`CNG consumption cannot be reliably returned in ${fuelUnit}. Returning value in Kilograms (kg).`);
//         return parseFloat(estimatedDistance.toFixed(2));
//       }

//     default:
//       console.error(`Unknown fuel type: ${fuelType}`);
//       return null;
//   }
// };

// src/components/utils/fuelCalculations.ts

/**
 * Fleet Fuel Calculation Utilities
 *
 * Industry benchmarks used (Nigerian heavy-truck context):
 *
 *  DIESEL   — 2.0 – 4.0 km/L  → default 2.5 km/L
 *             Articulated/18-wheeler trucks: 2.0–3.5 km/L depending on load & terrain.
 *             Source: NARTO operational data; similar to South African/East African fleet benchmarks.
 *
 *  PETROL   — 4.0 – 6.0 km/L  → default 5.0 km/L
 *             Petrol-powered light commercial / pickup trucks.
 *
 *  CNG      — measured in kg, not litres.
 *             1 kg CNG ≈ 1.39 L diesel equivalent (LDE) in energy content.
 *             CNG truck efficiency ≈ 2.5 km/kg  (heavy truck, similar route to diesel).
 *             This is more accurate than converting to "L equivalent" and applying a
 *             diesel efficiency because CNG engines have different volumetric efficiency.
 *             Recommended: track km/kg directly; default 2.5 km/kg.
 *
 *  LPG      — 1 litre LPG ≈ 0.74 L diesel equivalent; ~3.5 km/L for heavy trucks.
 *
 *  ELECTRIC — kWh-based. Heavy trucks: ~1.5–2.5 kWh/km → default 0.5 km/kWh (2 kWh/km).
 *             This gives km from kWh supplied.
 *
 *  OTHER    — conservative diesel-like fallback: 2.0 km/unit.
 *
 * CO₂ emission factors (for reporting):
 *  DIESEL   — 2.68  kg CO₂ per litre
 *  PETROL   — 2.31  kg CO₂ per litre
 *  CNG      — 2.75  kg CO₂ per kg   (methane combustion: CH₄ + 2O₂ → CO₂ + 2H₂O)
 *  ELECTRIC — 0.43  kg CO₂ per kWh  (Nigerian grid average; adjust per source)
 *  LPG      — 1.63  kg CO₂ per litre
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type FuelType = "DIESEL" | "PETROL" | "CNG" | "ELECTRIC" | "LPG" | "OTHER";
export type FuelUnit = "L" | "KG" | "kWh" | "SCM" | string;

export interface FuelConfig {
  /** Default efficiency: km per native unit */
  defaultKmPerUnit: number;
  /** Canonical unit for this fuel type */
  unit: FuelUnit;
  /** kg CO₂ emitted per native unit */
  co2PerUnit: number;
  /** Human-readable label */
  label: string;
  /** Diesel-equivalent litres per unit (for cross-fuel comparison) */
  ldePerUnit: number;
}

// ─── Master fuel configuration table ─────────────────────────────────────────

export const FUEL_CONFIG: Record<FuelType, FuelConfig> = {
  DIESEL: {
    defaultKmPerUnit: 2.5,
    unit:             "L",
    co2PerUnit:       2.68,
    label:            "Diesel",
    ldePerUnit:       1.0,         // baseline
  },
  PETROL: {
    defaultKmPerUnit: 5.0,
    unit:             "L",
    co2PerUnit:       2.31,
    label:            "Petrol",
    ldePerUnit:       0.86,        // petrol has ~14% less energy per litre than diesel
  },
  CNG: {
    /**
     * WHY km/kg (not km/SCM or km/LDE):
     * CNG is dispensed and sold by the kilogram at Nigerian CNG stations.
     * Tracking km/kg is the most operationally accurate approach — it matches
     * what appears on the fuel receipt and what the driver can verify.
     *
     * Heavy articulated truck: ~2.5 km/kg is a conservative fleet benchmark.
     * (Lighter duty trucks: up to 3.5 km/kg; fully loaded tankers: ~2.0 km/kg.)
     */
    defaultKmPerUnit: 2.5,
    unit:             "KG",
    co2PerUnit:       2.75,        // kg CO₂ per kg CNG (pure methane combustion)
    label:            "CNG",
    ldePerUnit:       1.39,        // 1 kg CNG ≈ 1.39 L diesel in energy content
  },
  ELECTRIC: {
    /**
     * 0.5 km/kWh = 2 kWh/km — typical heavy truck energy consumption.
     * (Passenger EV: ~6 km/kWh; heavy truck: 0.4–0.7 km/kWh)
     */
    defaultKmPerUnit: 0.5,
    unit:             "kWh",
    co2PerUnit:       0.43,        // Nigerian grid average; will vary by source
    label:            "Electric",
    ldePerUnit:       0.31,        // 1 kWh ≈ 0.31 L diesel equivalent in energy
  },
  LPG: {
    defaultKmPerUnit: 3.5,
    unit:             "L",
    co2PerUnit:       1.63,
    label:            "LPG",
    ldePerUnit:       0.74,
  },
  OTHER: {
    defaultKmPerUnit: 2.0,
    unit:             "L",
    co2PerUnit:       2.68,        // assume diesel-like emissions as conservative fallback
    label:            "Other",
    ldePerUnit:       1.0,
  },
};

// ─── Core calculation functions ───────────────────────────────────────────────

/**
 * Estimate distance (km) from fuel dispensed.
 *
 * @param fuelType  - Type of fuel
 * @param unit      - Unit in which fuel is measured (used for validation / CNG SCM fallback)
 * @param qtyGiven  - Quantity of fuel dispensed in the given unit
 * @param customKmPerUnit - Override the default efficiency (e.g. from vehicle's stored value)
 * @returns Estimated distance in km, or null if inputs are invalid
 */
export function getEstimatedFuelConsumption(
  fuelType: string,
  unit: FuelUnit,
  qtyGiven: number,
  customKmPerUnit?: number | null
): number | null {
  if (!fuelType || typeof qtyGiven !== "number" || qtyGiven <= 0 || isNaN(qtyGiven)) {
    return null;
  }

  const config = FUEL_CONFIG[fuelType as FuelType] ?? FUEL_CONFIG.OTHER;

  // For CNG dispensed by SCM (standard cubic metres) instead of kg:
  // 1 SCM CNG ≈ 0.72 kg → convert to kg first, then apply km/kg
  let effectiveQty = qtyGiven;
  if (fuelType === "CNG" && unit === "SCM") {
    effectiveQty = qtyGiven * 0.72;
  }

  const kmPerUnit = customKmPerUnit ?? config.defaultKmPerUnit;
  const estimated = +(effectiveQty * kmPerUnit).toFixed(1);

  return estimated > 0 ? estimated : null;
}

/**
 * Estimate fuel quantity consumed from distance covered.
 *
 * @param fuelType        - Type of fuel
 * @param distanceKm      - Distance covered in km
 * @param customKmPerUnit - Override default efficiency
 * @returns Estimated fuel consumed in native units, or null
 */
export function estimateFuelFromDistance(
  fuelType: string,
  distanceKm: number,
  customKmPerUnit?: number | null
): number | null {
  if (!fuelType || typeof distanceKm !== "number" || distanceKm <= 0 || isNaN(distanceKm)) {
    return null;
  }

  const config    = FUEL_CONFIG[fuelType as FuelType] ?? FUEL_CONFIG.OTHER;
  const kmPerUnit = customKmPerUnit ?? config.defaultKmPerUnit;

  if (kmPerUnit <= 0) return null;

  return +(distanceKm / kmPerUnit).toFixed(2);
}

/**
 * Estimate CO₂ emissions from fuel consumed.
 *
 * @param fuelType - Type of fuel
 * @param qty      - Quantity consumed in native unit
 * @returns kg of CO₂ emitted, or null
 */
export function estimateCO2(fuelType: string, qty: number): number | null {
  if (!fuelType || typeof qty !== "number" || qty <= 0 || isNaN(qty)) return null;

  const config = FUEL_CONFIG[fuelType as FuelType] ?? FUEL_CONFIG.OTHER;
  return +(qty * config.co2PerUnit).toFixed(2);
}

/**
 * Convert any fuel quantity to Diesel Litre Equivalent (LDE).
 * Useful for cross-fleet cost and efficiency comparison.
 *
 * @param fuelType - Type of fuel
 * @param qty      - Quantity in native unit
 * @returns Diesel-equivalent litres, or null
 */
export function toDieselEquivalent(fuelType: string, qty: number): number | null {
  if (!fuelType || typeof qty !== "number" || qty <= 0 || isNaN(qty)) return null;

  const config = FUEL_CONFIG[fuelType as FuelType] ?? FUEL_CONFIG.OTHER;
  return +(qty * config.ldePerUnit).toFixed(2);
}

/**
 * Calculate cost per kilometre for a fuel entry.
 *
 * @param fuelCost   - Total cost of fuel (₦)
 * @param distanceKm - Distance covered in km
 * @returns ₦ per km, or null
 */
export function costPerKm(fuelCost: number, distanceKm: number): number | null {
  if (
    typeof fuelCost !== "number"   || fuelCost < 0   || isNaN(fuelCost)   ||
    typeof distanceKm !== "number" || distanceKm <= 0 || isNaN(distanceKm)
  ) return null;

  return +(fuelCost / distanceKm).toFixed(2);
}

/**
 * Compute actual fuel efficiency from a completed trip.
 *
 * @param distanceKm - Actual distance covered
 * @param qtyUsed    - Actual fuel consumed
 * @returns km per unit (actual efficiency)
 */
export function actualEfficiency(distanceKm: number, qtyUsed: number): number | null {
  if (
    typeof distanceKm !== "number" || distanceKm <= 0 || isNaN(distanceKm) ||
    typeof qtyUsed    !== "number" || qtyUsed <= 0    || isNaN(qtyUsed)
  ) return null;

  return +(distanceKm / qtyUsed).toFixed(2);
}

/**
 * Get the canonical unit label and input hints for a given fuel type.
 * Useful for driving form UI labels dynamically.
 */
export function getFuelUnitInfo(fuelType: string): {
  unit: string;
  placeholder: string;
  hint: string;
} {
  const configs: Record<string, { unit: string; placeholder: string; hint: string }> = {
    DIESEL:   { unit: "L",   placeholder: "e.g. 150",  hint: "Litres of diesel dispensed" },
    PETROL:   { unit: "L",   placeholder: "e.g. 80",   hint: "Litres of petrol dispensed" },
    CNG:      { unit: "KG",  placeholder: "e.g. 60",   hint: "Kilograms of CNG filled (as shown on receipt)" },
    ELECTRIC: { unit: "kWh", placeholder: "e.g. 200",  hint: "kWh charged to the vehicle" },
    LPG:      { unit: "L",   placeholder: "e.g. 100",  hint: "Litres of LPG dispensed" },
    OTHER:    { unit: "L",   placeholder: "e.g. 100",  hint: "Quantity in applicable unit" },
  };

  return configs[fuelType] ?? configs.OTHER;
}

/**
 * Fuel efficiency rating compared to the fleet default benchmark.
 * Returns "good" | "average" | "poor" for display in the UI.
 */
export function efficiencyRating(
  fuelType: string,
  actualKmPerUnit: number
): "good" | "average" | "poor" {
  const config    = FUEL_CONFIG[fuelType as FuelType] ?? FUEL_CONFIG.OTHER;
  const benchmark = config.defaultKmPerUnit;
  const ratio     = actualKmPerUnit / benchmark;

  if (ratio >= 0.95) return "good";
  if (ratio >= 0.75) return "average";
  return "poor";
}

// ─── Convenience: default unit per fuel type (for form auto-fill) ────────────

export const DEFAULT_FUEL_UNIT: Record<string, string> = Object.fromEntries(
  Object.entries(FUEL_CONFIG).map(([k, v]) => [k, v.unit])
);

// ─── Convenience: default km/unit per fuel type ───────────────────────────────

export const DEFAULT_KM_PER_UNIT: Record<string, number> = Object.fromEntries(
  Object.entries(FUEL_CONFIG).map(([k, v]) => [k, v.defaultKmPerUnit])
);
