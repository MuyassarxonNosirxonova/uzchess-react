export function formatPrice(amount: number | string): string {
  if (Number(amount) === 0) {
    return "Bepul kurs";
  }

  const [integerPart, fractionPart] = Number(amount)
    .toFixed(2)
    .split(".");

  const groupedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  return `${groupedInteger}.${fractionPart} uzs`;
}