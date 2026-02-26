/**
 * Calculates the final 'fuelLeft' for the current trip by reconciling the fuel 
 * remaining from the previous trip and the current trip's usage.
 *
 * @param {number} currentTripQtyGiven - The quantity of fuel given for the current trip (from the form 'qtyGiven').
 * @param {number} currentTripQtyConsumed - The calculated or estimated consumption for the current trip (from the form 'qtyConsume').
 * @param {number | null} previousTripFuelLeft - The reported 'fuelLeft' from the previous trip (the starting fuel).
 * @returns {number} The final calculated fuel remaining for the current trip.
 */
export const calculateFinalFuelLeft = (
  currentTripQtyGiven, 
  currentTripQtyConsumed, 
  previousTripFuelLeft
) => {
  // 1. Input Validation and Sanitization
  const given = parseFloat(currentTripQtyGiven) || 0;
  const consumed = parseFloat(currentTripQtyConsumed) || 0;
  // Treat null or non-numeric previous fuel left as 0
  const previousLeft = previousTripFuelLeft !== null ? parseFloat(previousTripFuelLeft) : 0;
  
  // Ensure we are working with non-negative numbers
  if (given < 0 || consumed < 0 ) {
    // In case of invalid input, it's safer to return 0 or null, 
    // but we'll stick to a number (0) as requested.
    return 0; 
  }

  if(given===0){
    return previousLeft
  }
  // 2. Core Calculation
  
  // Total fuel available at the start of the current trip
  // (Fuel carried over from last trip + Fuel added for current trip)
  const fuelAtStart = previousLeft + given;

  // The final calculated fuel remaining
  const finalFuelLeft = fuelAtStart - consumed;
  
  // 3. Return the result
  
  // Ensure the result is rounded and returned as a number.
  // Although a negative value indicates an 'Error' scenario (consumed more than available),
  // returning the negative value provides an accurate reading of the *imbalance*.
  return parseFloat(finalFuelLeft.toFixed(2));
};