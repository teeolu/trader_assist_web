import {
  EDIT_INVESTMENT_REQUEST,
  EDIT_INVESTMENT_REQUEST_SUCCESS,
  EDIT_INVESTMENT_REQUEST_FAILURE,
  RESET_EDIT_INVESTMENT_REQUEST,
} from './actionTypes';

const initialState = {
  isFetching: false,
  editId: '',
  errorMessage: '',
  status: null,
};

export const Status = {
  EDIT_INVESTMENT_REQUEST_FAILURE: `EDIT_INVESTMENT_REQUEST_FAILURE`,
  EDIT_INVESTMENT_REQUEST_SUCCESS: `EDIT_INVESTMENT_REQUEST_SUCCESS`,
};

const editInvestmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_INVESTMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
        editId: action.payload,
      };
    case EDIT_INVESTMENT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.EDIT_INVESTMENT_REQUEST_SUCCESS,
        editId: '',
      };
    case EDIT_INVESTMENT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.EDIT_INVESTMENT_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case RESET_EDIT_INVESTMENT_REQUEST:
      return initialState;
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.editInvestment.isFetching;
export const getErrorMessageState = (state) => state.editInvestment.errorMessage;
export const getStatusState = (state) => state.editInvestment.status;
export const getEditIdState = (state) => state.editInvestment.editId;

export default editInvestmentReducer;
