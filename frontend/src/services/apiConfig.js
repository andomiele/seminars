const API_V1 = 'api/v1';

export const ROUT_CHANNELS = 'CHANNELS';
export const ROUT_MESSAGES = 'MESSAGES';
export const ROUT_LOGIN = 'LOGIN';
export const ROUT_SIGNUP = 'SIGNUP';

const API_ROUTES = {
  [ROUT_CHANNELS]: `${API_V1}/channels`,
  [ROUT_MESSAGES]: `${API_V1}/messages`,
  [ROUT_LOGIN]: `${API_V1}/login`,
  [ROUT_SIGNUP]: `${API_V1}/signup`,
  UNDEFINED: '',
};

export const getRoute = (apiRout) => (
  API_ROUTES[apiRout] || API_ROUTES.UNDEFINED
);
