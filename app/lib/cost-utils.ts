export function computeFuelCost(qtyGiven: number, unitPrice: number) {
  return Number((qtyGiven * unitPrice).toFixed(2));
}

export function computePartsCost(qtyUsed: number, unitPrice: number) {
  return Number((qtyUsed * unitPrice).toFixed(2));
}
