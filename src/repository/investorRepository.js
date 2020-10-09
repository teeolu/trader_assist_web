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
  // GET_INVESTOR_RETURNS_REQUEST,
  // GET_INVESTOR_RETURNS_REQUEST_SUCCESS,
  // GET_INVESTOR_RETURNS_REQUEST_FAILURE,
  CONFIRM_RETURNS_REQUEST,
  CONFIRM_RETURNS_REQUEST_SUCCESS,
  CONFIRM_RETURNS_REQUEST_FAILURE,
} from '../redux/investor/actionTypes';
import store from '../redux/store';

const InvestorRepository = function (axiosInstance) {
  let InvestorRepository = {
    getInvestmentReturns: function ({ investmentId, params = {} }) {
      store.dispatch({
        type: GET_INVESTMENT_RETURNS_REQUEST,
      });

      return axiosInstance
        .get(`/returns/${investmentId}`, {
          params,
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: GET_INVESTMENT_RETURNS_REQUEST_SUCCESS,
              payload: {
                [investmentId]: data,
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
    // getInvestorReturns: function ({ params = {} }) {
    //   store.dispatch({
    //     type: GET_INVESTOR_RETURNS_REQUEST,
    //   });

    //   return axiosInstance
    //     .get('/api/investors/investor-returns', {
    //       params,
    //     })
    //     .then(function (response) {
    //       const { status, message, data } = response.data;
    //       if (status) {
    //         store.dispatch({
    //           type: GET_INVESTOR_RETURNS_REQUEST_SUCCESS,
    //           payload: {
    //             [params.investorId]: { data: data.returns, size: data.size },
    //           },
    //         });
    //         return;
    //       }
    //       store.dispatch({
    //         type: GET_INVESTOR_RETURNS_REQUEST_FAILURE,
    //         payload: message,
    //       });
    //     })
    //     .catch(function (error) {
    //       store.dispatch({
    //         type: GET_INVESTOR_RETURNS_REQUEST_FAILURE,
    //         payload: error.message,
    //       });
    //     });
    // },
    getInvestorInvestment: function ({ params = {} }) {
      store.dispatch({
        type: GET_INVESTOR_INVESTMENT_REQUEST,
      });

      return axiosInstance
        .get(`/investments/investor`, {
          params,
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (status) {
            store.dispatch({
              type: GET_INVESTOR_INVESTMENT_REQUEST_SUCCESS,
              payload: {
                investments: { [params.investorId]: data.docs },
                size: data.total,
                page: data.page,
                pages: data.pages,
              },
            });
            return;
          } else {
            store.dispatch({
              type: GET_INVESTOR_INVESTMENT_REQUEST_FAILURE,
              payload: message,
            });
          }
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTOR_INVESTMENT_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestor: function ({ investorId, params = {} }) {
      store.dispatch({
        type: GET_INVESTOR_REQUEST,
      });

      return axiosInstance
        .get(`/investor/${investorId}`, { params })
        .then(function (response) {
          const { status, message, data } = response.data;
          console.log('GET_RETURNS_CALENDAR_OVERVIEW_REQUEST fail', status);

          if (!!status) {
            store.dispatch({
              type: GET_INVESTOR_REQUEST_SUCCESS,
            });
            store.dispatch({
              type: SET_CURRENT_INVESTOR,
              payload: { [data.investorId]: data },
            });
            return;
          } else {
            store.dispatch({
              type: GET_INVESTOR_REQUEST_FAILURE,
              payload: message,
            });
          }
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_INVESTOR_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getInvestors: function ({ params = {} }) {
      const platformId = store.getState().addBusiness.currentBusiness.platformId;
      store.dispatch({
        type: GET_INVESTORS_REQUEST,
      });

      return axiosInstance
        .get(`/investors`, {
          params: {
            ...params,
            platformId,
          },
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (!!status) {
            store.dispatch({
              type: GET_INVESTORS_REQUEST_SUCCESS,
              payload: {
                investors: data.docs,
                total: data.total,
                page: data.page,
                totalPages: data.pages,
              },
            });
            return;
          } else {
            store.dispatch({
              type: GET_INVESTORS_REQUEST_FAILURE,
              payload: message,
            });
          }
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
        .post('/investor', {
          ...formData,
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (!!status) {
            store.dispatch({
              type: ADD_INVESTOR_REQUEST_SUCCESS,
              payload: data,
            });
            return status;
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
          const { success, message } = response.data;
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
        .post('/investment', {
          ...formData,
        })
        .then(function (response) {
          const { status, message } = response.data;
          if (status) {
            const params = {
              investorId: formData.investor,
            };
            InvestorRepository.getInvestors({ params });
            InvestorRepository.getInvestor({ params });
            InvestorRepository.getInvestorReturns({ params });
            store.dispatch({
              type: ADD_INVESTMENT_REQUEST_SUCCESS,
            });
            return true;
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
        .get('/history/investor', {
          params,
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (status) {
            store.dispatch({
              type: GET_INVESTOR_HISTORY_REQUEST_SUCCESS,
              payload: { [params.investorId]: data },
            });
            return;
          } else {
            store.dispatch({
              type: GET_INVESTOR_HISTORY_REQUEST_FAILURE,
              payload: message,
            });
          }
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
          const { success, message } = response.data;
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
