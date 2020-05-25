import {
  GET_INVESTOR_HISTORY_REQUEST,
  GET_INVESTOR_HISTORY_REQUEST_FAILURE,
  GET_INVESTOR_HISTORY_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  investorHistory: {},
};

export const Status = {
  GET_INVESTOR_HISTORY_REQUEST_SUCCESS: `GET_INVESTOR_HISTORY_REQUEST_SUCCESS`,
  GET_INVESTOR_HISTORY_REQUEST_FAILURE: `GET_INVESTOR_HISTORY_REQUEST_FAILURE`,
};

const getInvestorHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTOR_HISTORY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_INVESTOR_HISTORY_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_HISTORY_REQUEST_SUCCESS,
        investorHistory: { ...state.investorHistory, ...action.payload },
      };
    case GET_INVESTOR_HISTORY_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_HISTORY_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestorHistory.isFetching;
export const getErrorMessageState = (state) => state.getInvestorHistory.errorMessage;
export const getStatusState = (state) => state.getInvestorHistory.status;
export const getInvestorHistoryState = (state) => state.getInvestorHistory.investorHistory;

export default getInvestorHistoryReducer;
