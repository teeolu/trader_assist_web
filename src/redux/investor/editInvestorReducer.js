import {
  EDIT_INVESTOR_REQUEST,
  EDIT_INVESTOR_REQUEST_SUCCESS,
  EDIT_INVESTOR_REQUEST_FAILURE,
  RESET_EDIT_INVESTOR_REQUEST,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  EDIT_INVESTOR_REQUEST_FAILURE: `EDIT_INVESTOR_REQUEST_FAILURE`,
  EDIT_INVESTOR_REQUEST_SUCCESS: `EDIT_INVESTOR_REQUEST_SUCCESS`,
};

const editInvestorReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_INVESTOR_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case EDIT_INVESTOR_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.EDIT_INVESTOR_REQUEST_SUCCESS,
      };
    case EDIT_INVESTOR_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.EDIT_INVESTOR_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case RESET_EDIT_INVESTOR_REQUEST:
      return initialState;
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.editInvestor.isFetching;
export const getErrorMessageState = (state) => state.editInvestor.errorMessage;
export const getStatusState = (state) => state.editInvestor.status;

export default editInvestorReducer;
