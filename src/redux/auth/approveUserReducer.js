import { APPROVE_USER, APPROVE_USER_FAILURE, APPROVE_USER_SUCCESS } from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  APPROVE_USER_SUCCESS: `APPROVE_USER_SUCCESS`,
  APPROVE_USER_FAILURE: `APPROVE_USER_FAILURE`,
};

const approveUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPROVE_USER:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
        status: null,
      };
    case APPROVE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.APPROVE_USER_SUCCESS,
      };
    case APPROVE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.APPROVE_USER_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.approveUser.isFetching;
export const getErrorMessageState = (state) => state.approveUser.errorMessage;
export const getStatusState = (state) => state.approveUser.status;

export default approveUserReducer;
