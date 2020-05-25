import { LOGIN_REQUEST, LOGIN_REQUEST_FAILURE, LOGIN_REQUEST_SUCCESS } from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  LOGIN_REQUEST_SUCCESS: `LOGIN_REQUEST_SUCCESS`,
  LOGIN_REQUEST_FAILURE: `LOGIN_REQUEST_FAILURE`,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
        status: null,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.LOGIN_REQUEST_SUCCESS,
      };
    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.LOGIN_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.login.isFetching;
export const getErrorMessageState = (state) => state.login.errorMessage;
export const getStatusState = (state) => state.login.status;

export default loginReducer;
