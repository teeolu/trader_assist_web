import {
  GET_INVESTMENT_REQUEST,
  GET_INVESTMENT_REQUEST_FAILURE,
  GET_INVESTMENT_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  investmentsById: {},
};

export const Status = {
  GET_INVESTMENT_REQUEST_SUCCESS: `GET_INVESTMENT_REQUEST_SUCCESS`,
  GET_INVESTMENT_REQUEST_FAILURE: `GET_INVESTMENT_REQUEST_FAILURE`,
};

const getInvestmentsByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_INVESTMENT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTMENT_REQUEST_SUCCESS,
        investmentsById: { ...state.investmentsById, ...action.payload },
      };
    case GET_INVESTMENT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTMENT_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestmentsById.isFetching;
export const getErrorMessageState = (state) => state.getInvestmentsById.errorMessage;
export const getStatusState = (state) => state.getInvestmentsById.status;
export const getInvestmentsByIdState = (state) => state.getInvestmentsById.investmentsById;

export default getInvestmentsByIdReducer;
