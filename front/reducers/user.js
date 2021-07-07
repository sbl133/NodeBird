export const initialstate = {
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  me: null,
  signUpData: {},
  loginData: {},
};
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const logoutRequestAction = {
  type: LOG_OUT_REQUEST,
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        isLoggingIn: true,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: 'bum' },
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};
export default reducer;
