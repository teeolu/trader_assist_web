import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAILURE,
  REGISTER_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  REGISTER_REQUEST_SUCCESS: `REGISTER_REQUEST_SUCCESS`,
  REGISTER_REQUEST_FAILURE: `REGISTER_REQUEST_FAILURE`,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.REGISTER_REQUEST_SUCCESS,
      };
    case REGISTER_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.REGISTER_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.register.isFetching;
export const getErrorMessageState = (state) => state.register.errorMessage;
export const getStatusState = (state) => state.register.status;

export default registerReducer;
