import {
  ADD_INVESTOR_REQUEST,
  ADD_INVESTOR_REQUEST_SUCCESS,
  ADD_INVESTOR_REQUEST_FAILURE,
  RESET_INVESTOR_REQUEST,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  addedInvestor: {},
};

export const Status = {
  ADD_INVESTOR_REQUEST_FAILURE: `ADD_INVESTOR_REQUEST_FAILURE`,
  ADD_INVESTOR_REQUEST_SUCCESS: `ADD_INVESTOR_REQUEST_SUCCESS`,
};

const addInvestorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVESTOR_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
      };
    case ADD_INVESTOR_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.ADD_INVESTOR_REQUEST_SUCCESS,
        addedInvestor: action.payload,
      };
    case ADD_INVESTOR_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.ADD_INVESTOR_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case RESET_INVESTOR_REQUEST:
      return initialState;
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.addInvestor.isFetching;
export const getErrorMessageState = (state) => state.addInvestor.errorMessage;
export const getStatusState = (state) => state.addInvestor.status;
export const getAddedInvestorState = (state) => state.addInvestor.addedInvestor;

export default addInvestorReducer;
