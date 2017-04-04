import axios from 'axios'
import { displayFlashMessage } from './flashMessage'

const DEFAULT_STATE = {
  loginLoading: false
}

// ******* Action Type *******

const LOGIN_LOADING = 'LOGIN_LOADING'

// ******* Action Creators & Reducer *******

export function loginRequest (userData) {
  return dispatch => {
    dispatch(loginLoading(true))
    return axios.post('/api/login/local', userData)
      .then(res => {
        dispatch(loginLoading(false))
        console.log('login success!', res)
        dispatch(displayFlashMessage({ message: 'You are logged in. Welcome back!', level: 'success' }))
      })
      .catch(err => {
        console.error('redux: loginLocal: loginRequest failed', err)
        dispatch(loginLoading(false))
        dispatch(displayFlashMessage({ message: 'Login failed. That\'s an error.', level: 'error' }))
      })
  }
}

export function loginLoading (bool) {
  return { type: LOGIN_LOADING, loginLoading: bool }
}
function loginLoadingReducer (state, action) {
  return Object.assign({}, state, { loginLoading: action.loginLoading })
}

// ******* Root Reducer Slice *******

export default function loginLocal (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return loginLoadingReducer(state, action)
    default:
      return state
  }
}
