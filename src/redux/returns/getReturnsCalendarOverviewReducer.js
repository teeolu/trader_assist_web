import {
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST,
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE,
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  returnsCalendarOverview: [],
};

export const Status = {
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_SUCCESS: `GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_SUCCESS`,
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE: `GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE`,
};

const getReturnsCalendarOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RETURNS_CALENDAR_OVERVIEW_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_SUCCESS,
        returnsCalendarOverview: action.payload,
      };
    case GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getReturnsCalendarOverview.isFetching;
export const getErrorMessageState = (state) => state.getReturnsCalendarOverview.errorMessage;
export const getStatusState = (state) => state.getReturnsCalendarOverview.status;
export const getReturnsCalendarOverviewState = (state) =>
  state.getReturnsCalendarOverview.returnsCalendarOverview;

export default getReturnsCalendarOverviewReducer;
