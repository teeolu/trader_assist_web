import {
  GET_INVESTOR_INVESTMENT_REQUEST,
  GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS,
  GET_INVESTOR_INVESTMENT_REQUEST_FAILURE,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  investorsInvestment: {
    investments: {},
    size: null,
  },
};

export const Status = {
  GET_INVESTOR_INVESTMENT_REQUEST_FAILURE: `GET_INVESTOR_INVESTMENT_REQUEST_FAILURE`,
  GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS: `GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS`,
};

const getInvestorInvestmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTOR_INVESTMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS,
        investorsInvestment: {
          investments: {
            ...state.investorsInvestment.investments,
            ...action.payload.investments,
          },
          size: action.payload.size,
        },
      };
    case GET_INVESTOR_INVESTMENT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_INVESTMENT_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestorInvestment.isFetching;
export const getErrorMessageState = (state) => state.getInvestorInvestment.errorMessage;
export const getStatusState = (state) => state.getInvestorInvestment.status;
export const getInvestorInvestmentsState = (state) =>
  state.getInvestorInvestment.investorsInvestment;

export default getInvestorInvestmentReducer;
