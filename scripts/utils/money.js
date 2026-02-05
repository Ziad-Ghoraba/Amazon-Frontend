export function formatCurrency(priceInCents) {
  const amount = priceInCents / 100;
  return `$${amount.toFixed(2)}`;
}
