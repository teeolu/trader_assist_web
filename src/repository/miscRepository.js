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
      // platform_image
      return (
        axiosInstance
          // .post('/image-upload', formData, {
          .post(`https://api.cloudinary.com/v1_1/${'cloud_name'}/image/upload`, formData, {
            onUploadProgress: function (progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

              store.dispatch({
                type: IMAGE_UPLOAD_PERCENTAGE,
                payload: percentCompleted,
              });
            },
            params: { action: 'update-user', api_key: '254458276384154' },
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(function (response) {
            const { status, message, data } = response;
            if (status === 200) {
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
          })
      );
    },
  };

  return _MiscRepository;
};

export { MiscRepository };
