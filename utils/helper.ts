export function truncate(
  text: string,
  startChar: number,
  endChar: number,
  maxLength: number
) {
  if (text.length > maxLength) {
    let start = text.substring(0, startChar);
    let end = text.substring(text.length - endChar, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
}

export function decimals() {
  return 10 ** 18;
}

export function formatTokenAmount(value: bigint | number | string): number {
  if (value === undefined || value === null) return 0;

  const num = Number(value) / decimals();

  if (Number.isInteger(num)) return num;

  return Number(num.toFixed(2));
}
