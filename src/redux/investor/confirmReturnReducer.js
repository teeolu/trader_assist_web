import {
  CONFIRM_RETURNS_REQUEST,
  CONFIRM_RETURNS_REQUEST_SUCCESS,
  CONFIRM_RETURNS_REQUEST_FAILURE,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  CONFIRM_RETURNS_REQUEST_FAILURE: `CONFIRM_RETURNS_REQUEST_FAILURE`,
  CONFIRM_RETURNS_REQUEST_SUCCESS: `CONFIRM_RETURNS_REQUEST_SUCCESS`,
};

const confirmReturnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRM_RETURNS_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case CONFIRM_RETURNS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.CONFIRM_RETURNS_REQUEST_SUCCESS,
      };
    case CONFIRM_RETURNS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.CONFIRM_RETURNS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.confirmReturn.isFetching;
export const getErrorMessageState = (state) => state.confirmReturn.errorMessage;
export const getStatusState = (state) => state.confirmReturn.status;

export default confirmReturnReducer;
