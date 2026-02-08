export function formatCurrency(priceInCents) {
  const amount = Math.round(priceInCents) / 100;
  return `$${amount.toFixed(2)}`;
}
