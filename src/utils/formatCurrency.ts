export const formatCurrency = (
  number: string | number,
  currency?: "currency"
): string => {
  const num = typeof number === "string" ? Number(number) : number;

  const opts: Intl.NumberFormatOptions = {
    style: currency === "currency" ? "currency" : "decimal",
    currency: currency === "currency" ? "EGP" : undefined,
    minimumFractionDigits: currency ? 2 : 0,
    maximumFractionDigits: currency ? 2 : 0,
    useGrouping: true,
  };

  return num.toLocaleString("en-US", opts);
};
