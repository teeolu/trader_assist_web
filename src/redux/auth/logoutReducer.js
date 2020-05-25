import { LOGOUT_REQUEST, LOGOUT_REQUEST_FAILURE, LOGOUT_REQUEST_SUCCESS } from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  LOGOUT_REQUEST_SUCCESS: `LOGOUT_REQUEST_SUCCESS`,
  LOGOUT_REQUEST_FAILURE: `LOGOUT_REQUEST_FAILURE`,
};

const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
        status: null,
      };
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.LOGOUT_REQUEST_SUCCESS,
      };
    case LOGOUT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.LOGOUT_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.logout.isFetching;
export const getErrorMessageState = (state) => state.logout.errorMessage;
export const getStatusState = (state) => state.logout.status;

export default logoutReducer;
