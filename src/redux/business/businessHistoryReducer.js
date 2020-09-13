import {
  GET_BUSINESS_HISTORY_REQUEST,
  GET_BUSINESS_HISTORY_REQUEST_FAILURE,
  GET_BUSINESS_HISTORY_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  businessHistory: {
    history: [],
    total: null,
  },
};

export const Status = {
  GET_BUSINESS_HISTORY_REQUEST_SUCCESS: `GET_BUSINESS_HISTORY_REQUEST_SUCCESS`,
  GET_BUSINESS_HISTORY_REQUEST_FAILURE: `GET_BUSINESS_HISTORY_REQUEST_FAILURE`,
};

const getBusinessHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_HISTORY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_BUSINESS_HISTORY_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESS_HISTORY_REQUEST_SUCCESS,
        businessHistory: {
          ...action.payload,
          history: [...state.businessHistory.history, ...action.payload.history],
        },
      };
    case GET_BUSINESS_HISTORY_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESS_HISTORY_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getBusinessHistory.isFetching;
export const getErrorMessageState = (state) => state.getBusinessHistory.errorMessage;
export const getStatusState = (state) => state.getBusinessHistory.status;
export const getBusinessHistoryState = (state) => state.getBusinessHistory.businessHistory;

export default getBusinessHistoryReducer;
