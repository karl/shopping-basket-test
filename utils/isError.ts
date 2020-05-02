export const isError = (errorPercentage = 10) => {
  const rand = Math.random() * 100;
  return rand <= errorPercentage;
};
