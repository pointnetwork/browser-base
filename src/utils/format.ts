type IAlphaNumeric = string | number;
export const formatNumber = (v: IAlphaNumeric) => {
  const str = `${v}`;
  if (str === '' || isNaN(Number(str))) return 'NaN';
  return formatNum(str);
};

const formatNum = (str: string) => {
  const n = str,
    p = n.indexOf('.');
  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
    p < 0 || i < p ? `${m},` : m,
  );
};
