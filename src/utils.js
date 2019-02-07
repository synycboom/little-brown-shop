// Suggested By: https://stackoverflow.com/a/2254896
export const formatComma = value => {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const formatPrice = currency => value => {
  const commaFormatted = formatComma(Number(value).toFixed(2));
  return `${currency}${commaFormatted}`;
};

export const formatThaiBath = value => formatPrice('฿')(value);
