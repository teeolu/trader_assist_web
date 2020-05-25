import {
  GET_INVESTOR_RETURNS_REQUEST,
  GET_INVESTOR_RETURNS_REQUEST_SUCCESS,
  GET_INVESTOR_RETURNS_REQUEST_FAILURE,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  returns: {},
};

export const Status = {
  GET_INVESTOR_RETURNS_REQUEST_FAILURE: `GET_INVESTOR_RETURNS_REQUEST_FAILURE`,
  GET_INVESTOR_RETURNS_REQUEST_SUCCESS: `GET_INVESTOR_RETURNS_REQUEST_SUCCESS`,
};

const getInvestorReturnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTOR_RETURNS_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case GET_INVESTOR_RETURNS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_RETURNS_REQUEST_SUCCESS,
        returns: {
          ...state.returns,
          ...action.payload,
        },
      };
    case GET_INVESTOR_RETURNS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_RETURNS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestorReturns.isFetching;
export const getErrorMessageState = (state) => state.getInvestorReturns.errorMessage;
export const getStatusState = (state) => state.getInvestorReturns.status;
export const getInvestorReturnsState = (state) => state.getInvestorReturns.returns;

export default getInvestorReturnsReducer;
