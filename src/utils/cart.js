export function clampQty(q) {
  const num = Number(q);
  if (Number.isNaN(num)) return 1;
  return Math.max(1, Math.min(99, Math.floor(num)));
}
