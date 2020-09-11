import {
  GET_BUSINESS_REQUEST,
  GET_BUSINESS_REQUEST_FAILURE,
  GET_BUSINESS_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  business: {},
};

export const Status = {
  GET_BUSINESS_REQUEST_SUCCESS: `GET_BUSINESS_REQUEST_SUCCESS`,
  GET_BUSINESS_REQUEST_FAILURE: `GET_BUSINESS_REQUEST_FAILURE`,
};

const getBusinessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_REQUEST:
      return {
        ...state,
        status: null,
        errorMessage: '',
        isFetching: true,
      };
    case GET_BUSINESS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESS_REQUEST_SUCCESS,
        business: action.payload,
      };
    case GET_BUSINESS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getBusiness.isFetching;
export const getErrorMessageState = (state) => state.getBusiness.errorMessage;
export const getStatusState = (state) => state.getBusiness.status;
export const getBusinessState = (state) => state.getBusiness.businesses;

export default getBusinessReducer;
