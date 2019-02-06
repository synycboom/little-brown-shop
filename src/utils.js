export const formatPrice = currency => value =>
  `${currency}${Number(value)
    .toFixed(2)
    .toLocaleString('en')}`;

export const formatThaiBath = value => formatPrice('฿')(value);
