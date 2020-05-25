import {
  GET_BUSINESSES_REQUEST,
  GET_BUSINESSES_REQUEST_FAILURE,
  GET_BUSINESSES_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  businesses: [],
};

export const Status = {
  GET_BUSINESSES_REQUEST_SUCCESS: `GET_BUSINESSES_REQUEST_SUCCESS`,
  GET_BUSINESSES_REQUEST_FAILURE: `GET_BUSINESSES_REQUEST_FAILURE`,
};

const getBusinessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESSES_REQUEST:
      return {
        ...state,
        status: null,
        errorMessage: '',
        isFetching: true,
      };
    case GET_BUSINESSES_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESSES_REQUEST_SUCCESS,
        businesses: action.payload,
      };
    case GET_BUSINESSES_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESSES_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getBusinesses.isFetching;
export const getErrorMessageState = (state) => state.getBusinesses.errorMessage;
export const getStatusState = (state) => state.getBusinesses.status;
export const getBusinessesState = (state) => state.getBusinesses.businesses;

export default getBusinessesReducer;
