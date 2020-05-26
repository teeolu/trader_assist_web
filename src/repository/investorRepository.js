import {
  ADD_INVESTOR_REQUEST,
  ADD_INVESTOR_REQUEST_SUCCESS,
  ADD_INVESTOR_REQUEST_FAILURE,
  ADD_INVESTMENT_REQUEST,
  ADD_INVESTMENT_REQUEST_SUCCESS,
  ADD_INVESTMENT_REQUEST_FAILURE,
  GET_INVESTORS_REQUEST,
  GET_INVESTORS_REQUEST_SUCCESS,
  GET_INVESTORS_REQUEST_FAILURE,
  GET_INVESTOR_INVESTMENT_REQUEST,
  GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS,
  GET_INVESTOR_INVESTMENT_REQUEST_FAILURE,
  GET_INVESTMENT_RETURNS_REQUEST,
  GET_INVESTMENT_RETURNS_REQUEST_SUCCESS,
  GET_INVESTMENT_RETURNS_REQUEST_FAILURE,
  EDIT_INVESTOR_REQUEST,
  EDIT_INVESTOR_REQUEST_SUCCESS,
  EDIT_INVESTOR_REQUEST_FAILURE,
  SET_CURRENT_INVESTOR,
  GET_INVESTOR_REQUEST,
  GET_INVESTOR_REQUEST_FAILURE,
  GET_INVESTOR_REQUEST_SUCCESS,
  GET_INVESTOR_HISTORY_REQUEST,
  GET_INVESTOR_HISTORY_REQUEST_SUCCESS,
  GET_INVESTOR_HISTORY_REQUEST_FAILURE,
  GET_INVESTOR_RETURNS_REQUEST,
  GET_INVESTOR_RETURNS_REQUEST_SUCCESS,
  GET_INVESTOR_RETURNS_REQUEST_FAILURE,
  CONFIRM_RETURNS_REQUEST,
  CONFIRM_RETURNS_REQUEST_SUCCESS,
  CONFIRM_RETURNS_REQUEST_FAILURE,
} from '../redux/investor/actionTypes';
import store from '../redux/store';
import { Api } from './Api';

const InvestorRepository = function (axiosInstance) {
  let InvestorRepository = {
    getInvestmentReturns: function ({ params = {} }) {
      store.dispatch({
        type: GET_INVESTMENT_RETURNS_REQUEST,
      });

      return axiosInstance
        .get('/api/investors/returns-by-investment', {
          params,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_INVESTMENT_RETURNS_REQUEST_SUCCESS,
              payload: {
                [params.investmentId]: data,
              },
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTMENT_RETURNS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTMENT_RETURNS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestorReturns: function ({ params = {} }) {
      store.dispatch({
        type: GET_INVESTOR_RETURNS_REQUEST,
      });

      return axiosInstance
        .get('/api/investors/investor-returns', {
          params,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_INVESTOR_RETURNS_REQUEST_SUCCESS,
              payload: {
                [params.investorId]: { data: data.returns, size: data.size },
              },
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTOR_RETURNS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTOR_RETURNS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestorInvestment: function ({ params = {} }) {
      store.dispatch({
        type: GET_INVESTOR_INVESTMENT_REQUEST,
      });

      return axiosInstance
        .get('/api/investors/investments-by-investor', {
          params,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS,
              payload: {
                investments: { [params.investorId]: data.investments },
                size: data.size,
              },
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTOR_INVESTMENT_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTOR_INVESTMENT_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestor: function ({ params = {} }) {
      store.dispatch({
        type: GET_INVESTOR_REQUEST,
      });

      return axiosInstance
        .get('/api/investors/investor', {
          params,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_INVESTOR_REQUEST_SUCCESS,
            });
            store.dispatch({
              type: SET_CURRENT_INVESTOR,
              payload: data,
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTOR_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTOR_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestors: function ({ params = {} }) {
      const businessId = store.getState().addBusiness.currentBusiness._id;
      store.dispatch({
        type: GET_INVESTORS_REQUEST,
      });

      return axiosInstance
        .get('/api/investors/investors', {
          params: {
            ...params,
            businessId,
          },
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_INVESTORS_REQUEST_SUCCESS,
              payload: data,
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTORS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTORS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    addInvestor: function ({ formData }) {
      store.dispatch({
        type: ADD_INVESTOR_REQUEST,
      });

      return axiosInstance
        .post('/api/investors/investor', {
          ...formData,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            InvestorRepository.getInvestors({});
            store.dispatch({
              type: ADD_INVESTOR_REQUEST_SUCCESS,
              payload: data,
            });
            return;
          }
          store.dispatch({
            type: ADD_INVESTOR_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: ADD_INVESTOR_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    editInvestor: function ({ formData: { _id, fullName, email, phoneNumber } }) {
      store.dispatch({
        type: EDIT_INVESTOR_REQUEST,
      });
      return axiosInstance
        .patch('/api/investors/investor', {
          _id,
          fullName,
          email,
          phoneNumber,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            InvestorRepository.getInvestors({});
            store.dispatch({
              type: EDIT_INVESTOR_REQUEST_SUCCESS,
            });

            InvestorRepository.getInvestor({
              params: {
                investorId: _id,
              },
            });
            return;
          }
          store.dispatch({
            type: EDIT_INVESTOR_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: EDIT_INVESTOR_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    addInvestment: function ({ formData }) {
      store.dispatch({
        type: ADD_INVESTMENT_REQUEST,
      });

      return axiosInstance
        .post('/api/investors/investment', {
          ...formData,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            const params = {
              investorId: formData.investor,
            };
            InvestorRepository.getInvestors({ params });
            InvestorRepository.getInvestor({ params });
            InvestorRepository.getInvestorReturns({ params });
            store.dispatch({
              type: ADD_INVESTMENT_REQUEST_SUCCESS,
            });
            return;
          }
          store.dispatch({
            type: ADD_INVESTMENT_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: ADD_INVESTMENT_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestorHistory: function ({ params }) {
      store.dispatch({
        type: GET_INVESTOR_HISTORY_REQUEST,
      });

      return axiosInstance
        .get('/api/investors/history', {
          params,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_INVESTOR_HISTORY_REQUEST_SUCCESS,
              payload: { [params.investorId]: data },
            });
            return;
          }
          store.dispatch({
            type: GET_INVESTOR_HISTORY_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTOR_HISTORY_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    confirmReturn: function ({ formData = {} }) {
      store.dispatch({
        type: CONFIRM_RETURNS_REQUEST,
      });
      return axiosInstance
        .patch('/api/investors/confirm-return', formData)
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: CONFIRM_RETURNS_REQUEST_SUCCESS,
            });
            return;
          }
          store.dispatch({
            type: CONFIRM_RETURNS_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: CONFIRM_RETURNS_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
  };

  return InvestorRepository;
};

export { InvestorRepository };