import { PRICE_LOCALES } from "./constants";

export const currency_formatter = (currency, price) => {
  const locale = PRICE_LOCALES[currency.toUpperCase()];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 3
  }).format(price);
}