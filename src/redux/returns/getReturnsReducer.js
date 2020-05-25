import {
  GET_RETURNS_REQUEST,
  GET_RETURNS_REQUEST_FAILURE,
  GET_RETURNS_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  returns: {
    returns: {},
    size: null,
  },
};

export const Status = {
  GET_RETURNS_REQUEST_SUCCESS: `GET_RETURNS_REQUEST_SUCCESS`,
  GET_RETURNS_REQUEST_FAILURE: `GET_RETURNS_REQUEST_FAILURE`,
};

const getReturnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RETURNS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_RETURNS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_RETURNS_REQUEST_SUCCESS,
        returns: {
          returns: { ...state.businessOverview },
          ...action.payload,
        },
      };
    case GET_RETURNS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_RETURNS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getReturns.isFetching;
export const getErrorMessageState = (state) => state.getReturns.errorMessage;
export const getStatusState = (state) => state.getReturns.status;
export const getReturnsState = (state) => state.getReturns.returns;

export default getReturnsReducer;
