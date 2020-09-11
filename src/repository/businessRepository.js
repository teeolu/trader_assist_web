import {
  ADD_BUSINESS_REQUEST,
  ADD_BUSINESS_REQUEST_SUCCESS,
  ADD_BUSINESS_REQUEST_FAILURE,
  SET_CURRENT_BUSINESS,
  // GET_BUSINESSES_REQUEST,
  // GET_BUSINESSES_REQUEST_SUCCESS,
  // GET_BUSINESSES_REQUEST_FAILURE,
  GET_BUSINESS_REQUEST,
  GET_BUSINESS_REQUEST_SUCCESS,
  GET_BUSINESS_REQUEST_FAILURE,
  GET_BUSINESS_OVERVIEW_REQUEST,
  GET_BUSINESS_OVERVIEW_REQUEST_SUCCESS,
  GET_BUSINESS_OVERVIEW_REQUEST_FAILURE,
  GET_BUSINESS_HISTORY_REQUEST_FAILURE,
  GET_BUSINESS_HISTORY_REQUEST_SUCCESS,
  GET_BUSINESS_HISTORY_REQUEST,
} from '../redux/business/actionTypes';
import store from '../redux/store';
import { overviewOptions } from '../constants/dateFilter';
import history from '../routes/history';
import { PrivatePaths } from '../routes';

const BusinessRepository = function (axiosInstance) {
  let _BusinessRepository = {
    addBusiness: function ({ formData }) {
      store.dispatch({
        type: ADD_BUSINESS_REQUEST,
      });
      return axiosInstance
        .post('/platform', formData)
        .then(function (response) {
          const { status, message } = response.data;
          if (status) {
            store.dispatch({
              type: ADD_BUSINESS_REQUEST_SUCCESS,
            });
            history.push(PrivatePaths.MY_PROFILE);
          } else {
            store.dispatch({
              type: ADD_BUSINESS_REQUEST_FAILURE,
              payload: message,
            });
          }
          return status;
        })
        .catch(function (error) {
          store.dispatch({
            type: ADD_BUSINESS_REQUEST_FAILURE,
            payload: error.message,
          });
          return error;
        });
    },
    // getBusinesses: function ({ businessId }) {
    //   store.dispatch({
    //     type: GET_BUSINESSES_REQUEST,
    //   });

    //   return axiosInstance
    //     .get('/platform')
    //     .then(function (response) {
    //       const { success, message, data } = response.data;
    //       if (success) {
    //         let selectedBusiness;
    //         if (!!businessId) {
    //           selectedBusiness = data.filter((el) => el._id === businessId);
    //         }

    //         store.dispatch({
    //           type: SET_CURRENT_BUSINESS,
    //           payload: !!selectedBusiness ? selectedBusiness : data[0],
    //         });
    //         function callBack() {
    //           store.dispatch({
    //             type: GET_BUSINESSES_REQUEST_SUCCESS,
    //             payload: data,
    //           });
    //         }

    //         _BusinessRepository.getBusinessOverview({
    //           callBack,
    //           businessId: !!selectedBusiness ? selectedBusiness._id : data[0]._id,
    //         });
    //         return;
    //       }
    //       store.dispatch({
    //         type: GET_BUSINESSES_REQUEST_FAILURE,
    //         payload: message,
    //       });
    //     })
    //     .catch(function (error) {
    //       store.dispatch({
    //         type: GET_BUSINESSES_REQUEST_FAILURE,
    //         payload: error.message,
    //       });
    //     });
    // },
    getBusiness: function ({ platformId }) {
      store.dispatch({
        type: GET_BUSINESS_REQUEST,
      });

      return axiosInstance
        .get(`/platform/${platformId}`, {
          params: {},
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (!!status) {
            store.dispatch({
              type: SET_CURRENT_BUSINESS,
              payload: data,
            });
            store.dispatch({
              type: GET_BUSINESS_REQUEST_SUCCESS,
              payload: data,
            });
            return;
          }
          store.dispatch({
            type: GET_BUSINESS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_BUSINESS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getBusinessOverview: function ({ callBack }) {
      let selectedOption = store.getState().businessMisc.selectedOption,
        businessId = store.getState().addBusiness.currentBusiness.platformId;
      if (!selectedOption.startDate || !selectedOption.endDate) selectedOption = overviewOptions[0];
      store.dispatch({
        type: GET_BUSINESS_OVERVIEW_REQUEST,
      });

      return axiosInstance
        .get('/api/business/overview', {
          params: {
            businessId,
            startDate: selectedOption.startDate,
            endDate: selectedOption.endDate,
          },
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (status) {
            store.dispatch({
              type: GET_BUSINESS_OVERVIEW_REQUEST_SUCCESS,
              payload: { [selectedOption.option]: data },
            });
            !!callBack && callBack();
            return;
          }
          store.dispatch({
            type: GET_BUSINESS_OVERVIEW_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_BUSINESS_OVERVIEW_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getBusinessHistory: function ({ selectedOption }) {
      store.dispatch({
        type: GET_BUSINESS_HISTORY_REQUEST,
      });

      return axiosInstance
        .get(`/history/platform`, {
          params: {
            platformId: store.getState().addBusiness.currentBusiness.platformId,
            dateFrom: selectedOption.startDate,
            dateTo: selectedOption.endDate,
            page: 1,
            limit: 10,
          },
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (status) {
            store.dispatch({
              type: GET_BUSINESS_HISTORY_REQUEST_SUCCESS,
              payload: {
                history: { [selectedOption.option]: data.history },
                size: data.size,
              },
            });
            return;
          }
          store.dispatch({
            type: GET_BUSINESS_HISTORY_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_BUSINESS_HISTORY_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
  };

  return _BusinessRepository;
};

export { BusinessRepository };
