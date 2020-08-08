import {
  GET_RETURNS_REQUEST,
  GET_RETURNS_REQUEST_SUCCESS,
  GET_RETURNS_REQUEST_FAILURE,
  EDIT_RETURNS_REQUEST,
  EDIT_RETURNS_REQUEST_SUCCESS,
  EDIT_RETURNS_REQUEST_FAILURE,
  GET_RETURN_REQUEST,
  GET_RETURN_REQUEST_SUCCESS,
  GET_RETURN_REQUEST_FAILURE,
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST,
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_SUCCESS,
  GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE,
} from '../redux/returns/actionTypes';
import store from '../redux/store';
import { overviewOptions } from '../constants/dateFilter';

const ReturnsRepository = function (axiosInstance) {
  let _ReturnsRepository = {
    getReturns: function ({ selectedOption = {}, params = {} }) {
      let businessId = store.getState().addBusiness.currentBusiness.platformId;
      if (!selectedOption.startDate || !selectedOption.endDate) selectedOption = overviewOptions[0];
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
    getReturnById: function ({ params = {} }) {
      let businessId = store.getState().addBusiness.currentBusiness.platformId;
      store.dispatch({
        type: GET_RETURN_REQUEST,
      });

      return axiosInstance
        .get('/api/business/return', {
          params: {
            businessId,
            returnId: params.returnId,
          },
        })
        .then(function (response) {
          const { success, message, data } = response.data;

          if (success) {
            store.dispatch({
              type: GET_RETURN_REQUEST_SUCCESS,
              payload: { [data._id]: data },
            });
            return;
          }
          store.dispatch({
            type: GET_RETURN_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_RETURN_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getReturnsCalendarOverviewId: function ({ params = {} }) {
      let businessId = store.getState().addBusiness.currentBusiness.platformId;
      store.dispatch({
        type: GET_RETURNS_CALENDAR_OVERVIEW_REQUEST,
      });

      return axiosInstance
        .get('/api/business/return-overview', {
          params: {
            businessId,
            ...params,
          },
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          // console.log('GET_RETURNS_CALENDAR_OVERVIEW_REQUEST ', params, response.data);
          if (success) {
            store.dispatch({
              type: GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_SUCCESS,
              payload: data,
            });
            return;
          }
          store.dispatch({
            type: GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_RETURNS_CALENDAR_OVERVIEW_REQUEST_FAILURE,
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
        .put('/api/business/returns', formData)
        .then(function (response) {
          const { success, message } = response.data;
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
