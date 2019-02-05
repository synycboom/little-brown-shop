export const formatPrice = currency => value =>
  `${currency}${Number(value).toLocaleString('en')}`;
