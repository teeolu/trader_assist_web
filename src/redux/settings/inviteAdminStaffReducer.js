import {
  INVITE_ADMIN_STAFF_REQUEST,
  INVITE_ADMIN_STAFF_REQUEST_FAILURE,
  INVITE_ADMIN_STAFF_REQUEST_SUCCESS,
  RESET_ADMIN_STAFF_INVITE,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
};

export const Status = {
  INVITE_ADMIN_STAFF_REQUEST_SUCCESS: `INVITE_ADMIN_STAFF_REQUEST_SUCCESS`,
  INVITE_ADMIN_STAFF_REQUEST_FAILURE: `INVITE_ADMIN_STAFF_REQUEST_FAILURE`,
};

const inviteAdminStaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_ADMIN_STAFF_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case INVITE_ADMIN_STAFF_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.INVITE_ADMIN_STAFF_REQUEST_SUCCESS,
      };
    case INVITE_ADMIN_STAFF_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.INVITE_ADMIN_STAFF_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case RESET_ADMIN_STAFF_INVITE:
      return initialState;
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.inviteAdminStaff.isFetching;
export const getErrorMessageState = (state) => state.inviteAdminStaff.errorMessage;
export const getStatusState = (state) => state.inviteAdminStaff.status;

export default inviteAdminStaffReducer;
