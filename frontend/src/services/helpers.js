// eslint-disable-next-line import/prefer-default-export
export const prepareHeaders = (headers, { getState }) => {
  const { token } = getState().auth;
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
};
