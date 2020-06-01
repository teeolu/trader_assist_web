import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { colors, fonts, sizes } from '../../../Css';
import { Api } from '../../../repository/Api';

import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../../redux/settings/inviteAdminStaffReducer';
import store from '../../../redux/store';
import { RESET_ADMIN_STAFF_INVITE } from '../../../redux/settings/actionTypes';
import { Modal, notification, Form, Input } from 'antd';
import { makeStyles } from '@material-ui/styles';
import { notificationConfigs } from '../../../constants/ToastNotifincation';

const InviteAdminStaffModal = ({ isVisible, role, closeModal }) => {
  const [form] = Form.useForm();

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  useEffect(() => {
    if (status === Status.INVITE_ADMIN_STAFF_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    if (status === Status.INVITE_ADMIN_STAFF_REQUEST_SUCCESS) {
      notification.success({
        message: 'Invite sent successfully',
        ...notificationConfigs,
      });
      store.dispatch({ type: RESET_ADMIN_STAFF_INVITE });
    }
  }, [status]);

  function onFinish() {
    Api.SettingsRepository.inviteAdminStaff({
      formData: {
        ...form.getFieldValue(),
        role,
      },
    }).then(() => {
      closeModal();
    });
  }

  function handleOk() {
    console.log(
      'form.getFieldValue form.getFieldValue ',
      form.getFieldValue(),
      form.getFieldsError(),
    );

    form.submit();
  }

  function handleCancel() {
    closeModal();
  }

  return (
    <Modal
      title={`Invite ${role === 'admin' ? 'an' : 'a'} ${role}`}
      visible={isVisible}
      onOk={handleOk}
      confirmLoading={isFetching}
      onCancel={handleCancel}>
      <p style={{ ...fonts.h4, color: colors.black2 }}>An invite link will be sent to the {role}</p>

      <Form
        form={form}
        name="joinWaitList"
        layout="vertical"
        hideRequiredMark={true}
        onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required!' },
            {
              type: 'email',
              message: 'Requires a valid email',
            },
          ]}>
          <Input size="large" placeholder="e.g myemail@emailprovider.com" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const styles = makeStyles({
  flexContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatListContainer: {
    justifyContent: 'flex-end',
    height: 120,
  },
  galleryImage: {
    width: 120,
    height: 120,
  },
});

export default InviteAdminStaffModal;
