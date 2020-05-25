import {
  ADD_INVESTMENT_REQUEST,
  ADD_INVESTMENT_REQUEST_SUCCESS,
  ADD_INVESTMENT_REQUEST_FAILURE,
  RESET_INVESTMENT_REQUEST,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  ADD_INVESTMENT_REQUEST_FAILURE: `ADD_INVESTMENT_REQUEST_FAILURE`,
  ADD_INVESTMENT_REQUEST_SUCCESS: `ADD_INVESTMENT_REQUEST_SUCCESS`,
};

const addInvestmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVESTMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case ADD_INVESTMENT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.ADD_INVESTMENT_REQUEST_SUCCESS,
      };
    case ADD_INVESTMENT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.ADD_INVESTMENT_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case RESET_INVESTMENT_REQUEST:
      return initialState;
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.addInvestment.isFetching;
export const getErrorMessageState = (state) => state.addInvestment.errorMessage;
export const getStatusState = (state) => state.addInvestment.status;

export default addInvestmentReducer;
