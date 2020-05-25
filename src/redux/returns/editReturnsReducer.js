import {
  EDIT_RETURNS_REQUEST,
  EDIT_RETURNS_REQUEST_SUCCESS,
  EDIT_RETURNS_REQUEST_FAILURE,
} from './actionTypes';
import { RESET_EDIT_INVESTMENT_REQUEST } from '../investment/actionTypes';

const initialState = {
  isFetching: false,
  editReturnId: '',
  errorMessage: '',
  status: null,
};

export const Status = {
  EDIT_RETURNS_REQUEST_FAILURE: `EDIT_RETURNS_REQUEST_FAILURE`,
  EDIT_RETURNS_REQUEST_SUCCESS: `EDIT_RETURNS_REQUEST_SUCCESS`,
};

const editReturnReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_RETURNS_REQUEST:
      return {
        ...state,
        isFetching: true,
        status: null,
        editReturnId: action.payload,
      };
    case EDIT_RETURNS_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.EDIT_RETURNS_REQUEST_SUCCESS,
        editReturnId: '',
      };
    case EDIT_RETURNS_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.EDIT_RETURNS_REQUEST_FAILURE,
        errorMessage: action.payload,
        editReturnId: '',
      };
    case RESET_EDIT_INVESTMENT_REQUEST:
      return initialState;
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.editReturn.isFetching;
export const getErrorMessageState = (state) => state.editReturn.errorMessage;
export const getStatusState = (state) => state.editReturn.status;
export const getEditReturnIdState = (state) => state.editReturn.editReturnId;

export default editReturnReducer;
