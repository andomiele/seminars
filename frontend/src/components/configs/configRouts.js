export const PAGE_MAIN = 'MAIN';
export const PAGE_LOGIN = 'LOGIN';
export const PAGE_SIGNUP = 'SIGNUP';
export const PAGE_NOT_FOUND = 'NOT_FOUND';

const PAGE_ROUTS = {
  [PAGE_MAIN]: '/',
  [PAGE_LOGIN]: '/login',
  [PAGE_SIGNUP]: '/signup',
  [PAGE_NOT_FOUND]: '*',
  UNDEFINED: '',
};

export const getPage = (page) => PAGE_ROUTS[page] || PAGE_ROUTS.UNDEFINED;
