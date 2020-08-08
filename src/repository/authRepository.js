import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILURE,
  SET_CURRENT_USER,
  REQUEST_USER_REQUEST,
  REQUEST_USER_REQUEST_SUCCESS,
  REQUEST_USER_REQUEST_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILURE,
  APPROVE_USER,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_FAILURE,
} from '../redux/auth/actionTypes';
import Auth from '../utils/auth';
import store from '../redux/store';
import { PrivatePaths } from '../routes';
import history from '../routes/history';

const AuthRepository = function (axiosInstance) {
  let _AuthRepository = {
    login: function ({ formData }) {
      store.dispatch({
        type: LOGIN_REQUEST,
      });
      return axiosInstance
        .post('/login', { ...formData })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (!!status) {
            store.dispatch({
              type: LOGIN_REQUEST_SUCCESS,
            });
            store.dispatch({
              type: SET_CURRENT_USER,
              payload: data,
            });
            Auth.setToken(data.token);
            axiosInstance.defaults.withCredentials = true;
            history.push(PrivatePaths.MY_PROFILE);
          } else {
            store.dispatch({
              type: LOGIN_REQUEST_FAILURE,
              payload: message,
            });
          }
        })
        .catch(function (error) {
          store.dispatch({
            type: LOGIN_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },

    logout: function () {
      store.dispatch({
        type: LOGOUT_REQUEST,
      });
      return axiosInstance
        .get('/api/users/logout')
        .then(function (response) {
          const { success, message } = response.data;
          if (success) {
            store.dispatch({
              type: LOGOUT_REQUEST_SUCCESS,
            });
            store.dispatch({
              type: SET_CURRENT_USER,
              payload: null,
            });
            Auth.removeToken();
            Auth.removeCurrentBusiness();
          } else {
            store.dispatch({
              type: LOGOUT_REQUEST_FAILURE,
              payload: message,
            });
          }
        })
        .catch(function (error) {
          store.dispatch({
            type: LOGOUT_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    register: function ({ formData }) {
      store.dispatch({
        type: REGISTER_REQUEST,
      });

      return axiosInstance
        .post('/register', {
          ...formData,
        })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (!!status) {
            store.dispatch({
              type: REGISTER_REQUEST_SUCCESS,
            });
            store.dispatch({
              type: SET_CURRENT_USER,
              payload: data.user,
            });
            axiosInstance.defaults.headers.common['authorization'] = `Bearer ${data.user.token}`;
            Auth.setToken(data.user.token);
            history.push(PrivatePaths.MY_PROFILE);
            return data;
          } else {
            store.dispatch({
              type: REGISTER_REQUEST_FAILURE,
              payload: message,
            });
          }
        })
        .catch(function (error) {
          store.dispatch({
            type: REGISTER_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    requestUser: function (token) {
      store.dispatch({
        type: REQUEST_USER_REQUEST,
      });

      return axiosInstance
        .get(`/me`, { params: { token } })
        .then(function (response) {
          const { status, message, data } = response.data;
          if (status) {
            store.dispatch({
              type: REQUEST_USER_REQUEST_SUCCESS,
            });
            store.dispatch({
              type: SET_CURRENT_USER,
              payload: data,
            });
          } else {
            store.dispatch({
              type: REQUEST_USER_REQUEST_FAILURE,
              payload: message,
            });
          }
        })
        .catch(function (error) {
          store.dispatch({
            type: REQUEST_USER_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    approveUser: function (token) {
      store.dispatch({
        type: APPROVE_USER,
      });

      return axiosInstance
        .put(`/verify/${token}`)
        .then(function (response) {
          const { status, message } = response.data;
          if (!!status) {
            store.dispatch({
              type: APPROVE_USER_SUCCESS,
            });
          } else {
            store.dispatch({
              type: APPROVE_USER_FAILURE,
              payload: message,
            });
          }
        })
        .catch(function (error) {
          store.dispatch({
            type: APPROVE_USER_FAILURE,
            payload: error.message,
          });
        });
    },
  };

  return _AuthRepository;
};

export { AuthRepository };
