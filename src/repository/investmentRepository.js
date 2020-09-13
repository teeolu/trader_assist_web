import {
  GET_INVESTMENTS_REQUEST,
  GET_INVESTMENTS_REQUEST_SUCCESS,
  GET_INVESTMENTS_REQUEST_FAILURE,
  EDIT_INVESTMENT_REQUEST,
  EDIT_INVESTMENT_REQUEST_SUCCESS,
  EDIT_INVESTMENT_REQUEST_FAILURE,
  GET_INVESTMENT_REQUEST,
  GET_INVESTMENT_REQUEST_SUCCESS,
  GET_INVESTMENT_REQUEST_FAILURE,
} from '../redux/investment/actionTypes';
import store from '../redux/store';

const InvestmentRepository = function (axiosInstance) {
  let _InvestmentRepository = {
    getInvesments: function ({ params = {} }) {
      let businessId = store.getState().addBusiness.currentBusiness.platformId;
      store.dispatch({
        type: GET_INVESTMENTS_REQUEST,
      });

      return axiosInstance
        .get('/investments/platform', {
          params: {
            platformId: businessId,
            ...params,
          },
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (status) {
            store.dispatch({
              type: GET_INVESTMENTS_REQUEST_SUCCESS,
              payload: {
                data: data.docs,
                size: data.total,
                currentPage: data.page,
                totalPages: data.pages,
              },
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTMENTS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTMENTS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestmentById: function ({ params = {} }) {
      let businessId = store.getState().addBusiness.currentBusiness.platformId;
      store.dispatch({
        type: GET_INVESTMENT_REQUEST,
      });

      return axiosInstance
        .get('/api/business/investment', {
          params: {
            businessId,
            investmentId: params.investmentId,
          },
        })
        .then(function (response) {
          const { success, message, data } = response.data;

          if (success) {
            store.dispatch({
              type: GET_INVESTMENT_REQUEST_SUCCESS,
              payload: { [data._id]: data },
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTMENT_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTMENT_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    editInvesments: function ({ formData, params = {}, selectedOption = {} }) {
      store.dispatch({
        type: EDIT_INVESTMENT_REQUEST,
        payload: formData.data._id,
      });
      return axiosInstance
        .put('/api/investors/investment', formData)
        .then(function (response) {
          const { success, message } = response.data;
          if (success) {
            _InvestmentRepository.getInvesments({ selectedOption, params });
            store.dispatch({
              type: EDIT_INVESTMENT_REQUEST_SUCCESS,
            });
            return;
          }
          store.dispatch({
            type: EDIT_INVESTMENT_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: EDIT_INVESTMENT_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
  };

  return _InvestmentRepository;
};

export { InvestmentRepository };
