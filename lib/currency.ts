export type Currency = "EUR" | "UAH" | "USD";

export const RATES: Record<Currency, number> = { EUR: 1, UAH: 45, USD: 1.1 };

export const SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  UAH: "₴",
  USD: "$",
};

export function formatPrice(eur: number, currency: Currency): string {
  const rate = RATES[currency] ?? 1;
  const symbol = SYMBOLS[currency] ?? "€";
  return symbol + Math.round((eur || 0) * rate).toLocaleString("en-US");
}
