import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_REQUEST_FAILURE,
  IMAGE_UPLOAD_REQUEST_SUCCESS,
  IMAGE_UPLOAD_PERCENTAGE,
} from './actionTypes';

const initialState = {
  isFetching: false,
  errorMessage: '',
  status: null,
  imageUploadingUri: '',
  imageUploadPercentage: null,
};

export const Status = {
  IMAGE_UPLOAD_REQUEST_SUCCESS: `IMAGE_UPLOAD_REQUEST_SUCCESS`,
  IMAGE_UPLOAD_REQUEST_FAILURE: `IMAGE_UPLOAD_REQUEST_FAILURE`,
};

const imageUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_PERCENTAGE:
      return {
        ...state,
        imageUploadPercentage: action.payload,
      };
    case IMAGE_UPLOAD_REQUEST:
      return {
        ...state,
        isFetching: true,
        imageUploadingUri: action.payload,
      };
    case IMAGE_UPLOAD_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: Status.IMAGE_UPLOAD_REQUEST_SUCCESS,
      };
    case IMAGE_UPLOAD_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: Status.IMAGE_UPLOAD_REQUEST_FAILURE,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export const getIsFetchingState = (state) => state.imageUpload.isFetching;
export const getErrorMessageState = (state) => state.imageUpload.errorMessage;
export const getStatusState = (state) => state.imageUpload.status;
export const getImageUploadUriState = (state) => state.imageUpload.imageUploadingUri;
export const getImageUploadPercentageState = (state) => state.imageUpload.imageUploadPercentage;

export default imageUploadReducer;
