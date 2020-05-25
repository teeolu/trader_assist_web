import {
  CANCEL_ADMIN_STAFF_INVITE_REQUEST,
  CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE,
  CANCEL_ADMIN_STAFF_INVITE_REQUEST_SUCCESS,
  RESET_CANCEL_ADMIN_STAFF_INVITE,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  staffId: '',
};

export const Status = {
  CANCEL_ADMIN_STAFF_INVITE_REQUEST_SUCCESS: `CANCEL_ADMIN_STAFF_INVITE_REQUEST_SUCCESS`,
  CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE: `CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE`,
};

const cancelAdminStaffInviteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_ADMIN_STAFF_INVITE_REQUEST:
      return {
        ...state,
        isFetching: true,
        staffId: action.payload,
      };
    case CANCEL_ADMIN_STAFF_INVITE_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.CANCEL_ADMIN_STAFF_INVITE_REQUEST_SUCCESS,
      };
    case CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    case RESET_CANCEL_ADMIN_STAFF_INVITE:
      return initialState;
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.cancelAdminStaffInvite.isFetching;
export const getErrorMessageState = (state) => state.cancelAdminStaffInvite.errorMessage;
export const getStatusState = (state) => state.cancelAdminStaffInvite.status;
export const getCancelStaffIdState = (state) => state.cancelAdminStaffInvite.staffId;

export default cancelAdminStaffInviteReducer;
