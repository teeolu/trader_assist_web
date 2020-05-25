import {
  GET_BUSINESS_OVERVIEW_REQUEST,
  GET_BUSINESS_OVERVIEW_REQUEST_FAILURE,
  GET_BUSINESS_OVERVIEW_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  businessOverview: {},
};

export const Status = {
  GET_BUSINESS_OVERVIEW_REQUEST_SUCCESS: `GET_BUSINESS_OVERVIEW_REQUEST_SUCCESS`,
  GET_BUSINESS_OVERVIEW_REQUEST_FAILURE: `GET_BUSINESS_OVERVIEW_REQUEST_FAILURE`,
};

const getBusinessOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_OVERVIEW_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_BUSINESS_OVERVIEW_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESS_OVERVIEW_REQUEST_SUCCESS,
        businessOverview: { ...state.businessOverview, ...action.payload },
      };
    case GET_BUSINESS_OVERVIEW_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_BUSINESS_OVERVIEW_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getBusinessOverview.isFetching;
export const getErrorMessageState = (state) => state.getBusinessOverview.errorMessage;
export const getStatusState = (state) => state.getBusinessOverview.status;
export const getBusinessOverviewState = (state) => state.getBusinessOverview.businessOverview;

export default getBusinessOverviewReducer;
