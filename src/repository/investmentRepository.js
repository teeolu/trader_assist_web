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
    getInvesments: function ({ selectedOption, params = {} }) {
      let businessId = store.getState().addBusiness.currentBusiness._id;
      if (!selectedOption.startDate || !selectedOption.endDate) return;
      store.dispatch({
        type: GET_INVESTMENTS_REQUEST,
      });

      return axiosInstance
        .get('/api/business/investments', {
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
              type: GET_INVESTMENTS_REQUEST_SUCCESS,
              payload: {
                investments: {
                  [selectedOption.option]: {
                    data: data.investments,
                    size: data.size,
                  },
                },
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
      let businessId = store.getState().addBusiness.currentBusiness._id;
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
