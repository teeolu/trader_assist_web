import {
  REQUEST_USER_REQUEST,
  REQUEST_USER_REQUEST_FAILURE,
  REQUEST_USER_REQUEST_SUCCESS,
  SET_CURRENT_USER,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  currentUser: null,
};

export const Status = {
  REQUEST_USER_REQUEST_SUCCESS: `REQUEST_USER_REQUEST_SUCCESS`,
  REQUEST_USER_REQUEST_FAILURE: `REQUEST_USER_REQUEST_FAILURE`,
};

const userRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.REQUEST_USER_REQUEST_SUCCESS,
      };
    case REQUEST_USER_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.REQUEST_USER_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.userRequest.isFetching;
export const getErrorMessageState = (state) => state.userRequest.errorMessage;
export const getStatusState = (state) => state.userRequest.status;
export const getCurrentUserState = (state) => state.userRequest.currentUser;

export default userRequestReducer;
