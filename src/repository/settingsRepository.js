import store from '../redux/store';
import {
  INVITE_ADMIN_STAFF_REQUEST,
  INVITE_ADMIN_STAFF_REQUEST_FAILURE,
  INVITE_ADMIN_STAFF_REQUEST_SUCCESS,
  GET_ADMIN_STAFF_REQUEST,
  GET_ADMIN_STAFF_REQUEST_SUCCESS,
  GET_ADMIN_STAFF_REQUEST_FAILURE,
  CANCEL_ADMIN_STAFF_INVITE_REQUEST,
  CANCEL_ADMIN_STAFF_INVITE_REQUEST_SUCCESS,
  CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE,
} from '../redux/settings/actionTypes';

const SettingsRepository = function (axiosInstance) {
  let _SettingsRepository = {
    inviteAdminStaff: function ({ formData }) {
      const businessId = store.getState().addBusiness.currentBusiness._id;
      store.dispatch({
        type: INVITE_ADMIN_STAFF_REQUEST,
      });
      return axiosInstance
        .post('/api/business/invite', { data: { ...formData }, businessId })
        .then(function (response) {
          const { success, message } = response.data;
          if (success) {
            store.dispatch({
              type: INVITE_ADMIN_STAFF_REQUEST_SUCCESS,
            });
            return _SettingsRepository.getAdminStaff();
          }
          store.dispatch({
            type: INVITE_ADMIN_STAFF_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: INVITE_ADMIN_STAFF_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    getAdminStaff: function () {
      const businessId = store.getState().addBusiness.currentBusiness._id;
      store.dispatch({
        type: GET_ADMIN_STAFF_REQUEST,
      });

      return axiosInstance
        .get('/api/business/staffs', {
          params: {
            businessId,
          },
        })
        .then(function (response) {
          const { success, message, data } = response.data;
          if (success) {
            const payload = {
              admins: data.staffs.filter((el) => el.role === 'admin'),
              staffs: data.staffs.filter((el) => el.role === 'staff'),
              size: data.size,
            };
            store.dispatch({
              type: GET_ADMIN_STAFF_REQUEST_SUCCESS,
              payload,
            });
            return;
          }
          store.dispatch({
            type: GET_ADMIN_STAFF_REQUEST_FAILURE,
            payload: message,
          });
          // create reducer for this action
        })
        .catch(function (error) {
          store.dispatch({
            type: GET_ADMIN_STAFF_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
    cancelAdminStaffInvite: function ({ params }) {
      const businessId = store.getState().addBusiness.currentBusiness._id;
      store.dispatch({
        type: CANCEL_ADMIN_STAFF_INVITE_REQUEST,
        payload: params.staffId,
      });

      return axiosInstance
        .delete('/api/business/cancel-invite', {
          params: {
            businessId,
            ...params,
          },
        })
        .then(function (response) {
          const { success, message } = response.data;
          if (success) {
            store.dispatch({
              type: CANCEL_ADMIN_STAFF_INVITE_REQUEST_SUCCESS,
            });
            return;
          }
          store.dispatch({
            type: CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE,
            payload: message,
          });
        })
        .catch(function (error) {
          store.dispatch({
            type: CANCEL_ADMIN_STAFF_INVITE_REQUEST_FAILURE,
            payload: error.message,
          });
        });
    },
  };

  return _SettingsRepository;
};

export { SettingsRepository };
