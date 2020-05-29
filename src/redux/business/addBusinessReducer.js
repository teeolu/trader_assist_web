import {
  ADD_BUSINESS_REQUEST,
  ADD_BUSINESS_REQUEST_FAILURE,
  ADD_BUSINESS_REQUEST_SUCCESS,
  SET_CURRENT_BUSINESS,
} from './actionTypes';
import Auth from '../../utils/auth';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  currentBusiness: Auth.getCurrentBusiness() || {},
};

export const Status = {
  ADD_BUSINESS_REQUEST_SUCCESS: `ADD_BUSINESS_REQUEST_SUCCESS`,
  ADD_BUSINESS_REQUEST_FAILURE: `ADD_BUSINESS_REQUEST_FAILURE`,
};

const addBusinessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUSINESS_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
        status: null,
      };
    case ADD_BUSINESS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.ADD_BUSINESS_REQUEST_SUCCESS,
      };
    case ADD_BUSINESS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.ADD_BUSINESS_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case SET_CURRENT_BUSINESS:
      return { ...state, currentBusiness: action.payload };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.addBusiness.isFetching;
export const getErrorMessageState = (state) => state.addBusiness.errorMessage;
export const getStatusState = (state) => state.addBusiness.status;
export const getCurrentBusinessState = (state) => state.addBusiness.currentBusiness;

export default addBusinessReducer;
