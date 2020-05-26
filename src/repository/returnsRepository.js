import {
  GET_RETURNS_REQUEST,
  GET_RETURNS_REQUEST_SUCCESS,
  GET_RETURNS_REQUEST_FAILURE,
  EDIT_RETURNS_REQUEST,
  EDIT_RETURNS_REQUEST_SUCCESS,
  EDIT_RETURNS_REQUEST_FAILURE,
} from '../redux/returns/actionTypes';
import store from '../redux/store';

const ReturnsRepository = function (axiosInstance) {
  let _ReturnsRepository = {
    getReturns: function ({ selectedOption, params = {} }) {
      let businessId = store.getState().addBusiness.currentBusiness._id;
      if (!selectedOption.startDate || !selectedOption.endDate) return;
      store.dispatch({
        type: GET_RETURNS_REQUEST,
      });

      return axiosInstance
        .get('/api/business/returns', {
          params: {
            businessId,
            startDate: selectedOption.startDate,
            endDate: selectedOption.endDate,
            ...params,
          },
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_RETURNS_REQUEST_SUCCESS,
              payload: {
                returns: {
                  [selectedOption.option]: {
                    data: data.returns,
                    size: data.size,
                  },
                },
              },
            });
            return;
          }
          store.dispatch({
            type: GET_RETURNS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_RETURNS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    editReturns: function ({ formData, params, selectedOption }) {
      store.dispatch({
        type: EDIT_RETURNS_REQUEST,
        payload: formData.data._id,
      });
      return axiosInstance
        .patch('/api/business/returns', formData)
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            _ReturnsRepository.getReturns({ selectedOption, params });
            store.dispatch({
              type: EDIT_RETURNS_REQUEST_SUCCESS,
            });
            return;
          }
          store.dispatch({
            type: EDIT_RETURNS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: EDIT_RETURNS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
  };

  return _ReturnsRepository;
};

export { ReturnsRepository };
