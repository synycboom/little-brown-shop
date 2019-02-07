// Suggested By: https://stackoverflow.com/a/31581206
export const formatPrice = currency => value =>
  `${currency}${Number(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

export const formatThaiBath = value => formatPrice('฿')(value);
