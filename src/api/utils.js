export const searchParamsToString = params => {
  const queryString = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) =>
    queryString.append(key, value)
  );

  if (queryString.toString() === '') return '';
  return `?${queryString.toString()}`;
};
