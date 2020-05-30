import {
  GET_RETURN_REQUEST,
  GET_RETURN_REQUEST_FAILURE,
  GET_RETURN_REQUEST_SUCCESS,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  returnsById: {},
};

export const Status = {
  GET_RETURN_REQUEST_SUCCESS: `GET_RETURN_REQUEST_SUCCESS`,
  GET_RETURN_REQUEST_FAILURE: `GET_RETURN_REQUEST_FAILURE`,
};

const getReturnsByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RETURN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_RETURN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_RETURN_REQUEST_SUCCESS,
        returnsById: { ...state.returnsById, ...action.payload },
      };
    case GET_RETURN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.GET_RETURN_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.getReturnsById.isFetching;
export const getErrorMessageState = (state) => state.getReturnsById.errorMessage;
export const getStatusState = (state) => state.getReturnsById.status;
export const getReturnsByIdState = (state) => state.getReturnsById.returnsById;

export default getReturnsByIdReducer;
