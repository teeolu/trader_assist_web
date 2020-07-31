import {
  GET_INVESTOR_REQUEST,
  GET_INVESTOR_REQUEST_SUCCESS,
  GET_INVESTOR_REQUEST_FAILURE,
  SET_CURRENT_INVESTOR,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  currentInvestor: {},
};

export const Status = {
  GET_INVESTOR_REQUEST_FAILURE: `GET_INVESTOR_REQUEST_FAILURE`,
  GET_INVESTOR_REQUEST_SUCCESS: `GET_INVESTOR_REQUEST_SUCCESS`,
};

const getInvestorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTOR_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case GET_INVESTOR_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_REQUEST_SUCCESS,
      };
    case GET_INVESTOR_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTOR_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case SET_CURRENT_INVESTOR:
      return {
        ...state,
        currentInvestor: { ...state.currentInvestor, ...action.payload },
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestor.isFetching;
export const getErrorMessageState = (state) => state.getInvestor.errorMessage;
export const getStatusState = (state) => state.getInvestor.status;
export const getCurrentInvestorState = (state) => state.getInvestor.currentInvestor;

export default getInvestorReducer;
