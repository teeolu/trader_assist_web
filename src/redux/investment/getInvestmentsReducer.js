import {
  GET_INVESTMENTS_REQUEST,
  GET_INVESTMENTS_REQUEST_FAILURE,
  GET_INVESTMENTS_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  investments: {
    data: [],
    size: null,
  },
};

export const Status = {
  GET_INVESTMENTS_REQUEST_SUCCESS: `GET_INVESTMENTS_REQUEST_SUCCESS`,
  GET_INVESTMENTS_REQUEST_FAILURE: `GET_INVESTMENTS_REQUEST_FAILURE`,
};

const getInvestmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_INVESTMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTMENTS_REQUEST_SUCCESS,
        investments: {
          ...action.payload,
        },
      };
    case GET_INVESTMENTS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_INVESTMENTS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getInvestments.isFetching;
export const getErrorMessageState = (state) => state.getInvestments.errorMessage;
export const getStatusState = (state) => state.getInvestments.status;
export const getInvestmentsState = (state) => state.getInvestments.investments;

export default getInvestmentsReducer;
