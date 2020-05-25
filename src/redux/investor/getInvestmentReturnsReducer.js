import {
  GET_INVESTMENT_RETURNS_REQUEST,
  GET_INVESTMENT_RETURNS_REQUEST_SUCCESS,
  GET_INVESTMENT_RETURNS_REQUEST_FAILURE,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  investmentReturns: {},
};

export const Status = {
  GET_INVESTMENT_RETURNS_REQUEST_FAILURE: `GET_INVESTMENT_RETURNS_REQUEST_FAILURE`,
  GET_INVESTMENT_RETURNS_REQUEST_SUCCESS: `GET_INVESTMENT_RETURNS_REQUEST_SUCCESS`,
};

const getInvestmentReturnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTMENT_RETURNS_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case GET_INVESTMENT_RETURNS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTMENT_RETURNS_REQUEST_SUCCESS,
        investmentReturns: { ...state.investmentReturns, ...action.payload },
      };
    case GET_INVESTMENT_RETURNS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTMENT_RETURNS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestorInvestment.isFetching;
export const getErrorMessageState = (state) => state.getInvestorInvestment.errorMessage;
export const getStatusState = (state) => state.getInvestorInvestment.status;
export const getInvestmentsReturnState = (state) => state.getInvestorInvestment.investmentReturns;

export default getInvestmentReturnsReducer;
