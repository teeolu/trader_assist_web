import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_REQUEST_SUCCESS,
  IMAGE_UPLOAD_REQUEST_FAILURE,
  IMAGE_UPLOAD_PERCENTAGE,
} from '../redux/misc/actionTypes';
import store from '../redux/store';

const MiscRepository = function (axiosInstance) {
  let _MiscRepository = {
    uploadImage: function ({ imageUploadUri, formData }) {
      store.dispatch({
        type: IMAGE_UPLOAD_REQUEST,
        payload: imageUploadUri,
      });
      store.dispatch({
        type: IMAGE_UPLOAD_PERCENTAGE,
        payload: null,
      });

      return axiosInstance
        .post('/api/image-upload/add', formData, {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

            store.dispatch({
              type: IMAGE_UPLOAD_PERCENTAGE,
              payload: percentCompleted,
            });
          },
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: IMAGE_UPLOAD_REQUEST_SUCCESS,
            });
            return data;
          }
          store.dispatch({
            type: IMAGE_UPLOAD_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: IMAGE_UPLOAD_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
  };

  return _MiscRepository;
};

export { MiscRepository };
