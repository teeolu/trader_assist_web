import {
  GET_ADMIN_STAFF_REQUEST,
  GET_ADMIN_STAFF_REQUEST_FAILURE,
  GET_ADMIN_STAFF_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  staffs: {
    admins: [],
    staffs: [],
    size: null,
  },
};

export const Status = {
  GET_ADMIN_STAFF_REQUEST_SUCCESS: `GET_ADMIN_STAFF_REQUEST_SUCCESS`,
  GET_ADMIN_STAFF_REQUEST_FAILURE: `GET_ADMIN_STAFF_REQUEST_FAILURE`,
};

const getBusinessStaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN_STAFF_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ADMIN_STAFF_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_ADMIN_STAFF_REQUEST_SUCCESS,
        staffs: {
          admins: action.payload.admins,
          staffs: action.payload.staffs,
          size: action.payload.size,
        },
      };
    case GET_ADMIN_STAFF_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_ADMIN_STAFF_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getBusinessStaff.isFetching;
export const getErrorMessageState = (state) => state.getBusinessStaff.errorMessage;
export const getStatusState = (state) => state.getBusinessStaff.status;
export const getBusinessStaffState = (state) => state.getBusinessStaff.staffs;

export default getBusinessStaffReducer;
