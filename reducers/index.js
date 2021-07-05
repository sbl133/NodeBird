
const initialstate={
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
maintPosts: []
  }
}

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}
export const logOutAction = () => {
  return {
    type: 'LOG_OUT',
  }
}

const rootReducer = (state = initialstate, action) => {
  switch (action.type){
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        }
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        }
      }
  }
}

export default rootReducer