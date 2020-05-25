import {
  GET_INVESTORS_REQUEST,
  GET_INVESTORS_REQUEST_SUCCESS,
  GET_INVESTORS_REQUEST_FAILURE,
  SET_CURRENT_INVESTOR,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  investors: {
    investors: [],
    size: null,
  },
  currentInvestor: {},
};

export const Status = {
  GET_INVESTORS_REQUEST_FAILURE: `GET_INVESTORS_REQUEST_FAILURE`,
  GET_INVESTORS_REQUEST_SUCCESS: `GET_INVESTORS_REQUEST_SUCCESS`,
};

const getInvestorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTORS_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case GET_INVESTORS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTORS_REQUEST_SUCCESS,
        investors: action.payload,
      };
    case GET_INVESTORS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTORS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case SET_CURRENT_INVESTOR:
      return {
        ...state,
        currentInvestor: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestors.isFetching;
export const getErrorMessageState = (state) => state.getInvestors.errorMessage;
export const getStatusState = (state) => state.getInvestors.status;
export const getInvestorsState = (state) => state.getInvestors.investors;
export const getCurrentInvestorState = (state) => state.getInvestors.currentInvestor;

export default getInvestorsReducer;
