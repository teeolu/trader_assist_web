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
} from '../redux/auth/actionTypes';
import Auth from '../utils/auth';
import store from '../redux/store';

const AuthRepository = function (axiosInstance) {
  let _AuthRepository = {
    login: function ({ formData, navigation }) {
      store.dispatch({
        type: LOGIN_REQUEST,
      });
      return axiosInstance
        .post('/api/users/login', { ...formData })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            store.dispatch({
              type: LOGIN_REQUEST_SUCCESS,
            });
            store.dispatch({
              type: SET_CURRENT_USER,
              payload: response.data,
            });
            Auth.setToken(data.token);
            !!navigation && navigation.navigate('overview', { screen: 'overview' });
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
        .post('/api/users/register', {
          ...formData,
        })
        .then(function (response) {
          const { success, message, data } = response.data;

          if (success) {
            store.dispatch({
              type: REGISTER_REQUEST_SUCCESS,
            });
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.user.token}`;
            Auth.setToken(data.user.token);
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
        .get('/api/users/auth', { params: { token } })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
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
  };

  return _AuthRepository;
};

export { AuthRepository };
