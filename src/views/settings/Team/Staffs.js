import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/styles';
import { notification, List, Avatar, Spin, Space, Modal, Popover, Button } from 'antd';

import { fontsize, colors, typography } from '../../../Css';
import { notificationConfigs } from '../../../constants/ToastNotifincation';
import {
  // getIsFetchingState,
  getBusinessStaffState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../../redux/settings/getBusinessStaffs';
import { Api } from '../../../repository/Api';
import Buttons from '../../../atoms/Buttons';
import InviteAdminStaffModal from './InviteAdminStaffModal';
import { ExclamationCircleOutlined, MoreOutlined } from '@ant-design/icons';

const Staffs = ({ navigation }) => {
  const [addAdminModalVisible, setAddAdminModalVisible] = useState(false);

  // const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const businessStaffs = useSelector(getBusinessStaffState);

  // const classes = useStyles();

  const pendingAdmin = businessStaffs.staffs.filter((el) => el.isActive === false);
  const activeAdmin = businessStaffs.staffs.filter((el) => el.isActive === true);

  useEffect(() => {
    fetchBusinessStaffs();
  }, []);

  useEffect(() => {
    if (status === Status.GET_INVESTORS_REQUEST_FAILURE) {
      notification['error']({
        message: errorMsg,
        ...notificationConfigs,
      });
    }
    // eslint-disable-next-line
  }, [status]);

  function fetchBusinessStaffs() {
    Api.SettingsRepository.getAdminStaff();
  }

  function confirmRevokeInvite(staffId) {
    Modal.confirm({
      title: 'Revoke invite',
      icon: <ExclamationCircleOutlined />,
      content: `Revoking the invite will mean the invited staff won't be able to join your team again`,
      okText: 'Revoke invite',
      cancelText: 'Cancel',
      onOk() {
        return new Promise((resolve, reject) => {
          Api.SettingsRepository.cancelAdminStaffInvite({
            params: {
              staffId: staffId,
            },
          })
            .then(() => fetchBusinessStaffs())
            .then(() => {
              resolve();
              notification['success']({
                message: 'The invitation was successfully revoked',
                ...notificationConfigs,
              });
            })
            .catch(() => {
              reject();
              notification['error']({
                message: 'Was not able to revoke the invitation',
                ...notificationConfigs,
              });
            });
        });
      },
      onCancel: () => alert('anything'),
    });
  }

  function renderPopoverContent(staffId) {
    return (
      <div>
        <Buttons
          btnText="Revoke invite"
          textColor={colors.pinkDark}
          btnAction={() => confirmRevokeInvite(staffId)}
          style={{
            padding: '0 0 10px 0',
            marginTop: 0,
            marginBottom: 20,
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ zIndex: 1 }}>
      {businessStaffs.size > 0 && (
        <div>
          <Buttons
            btnText="Add staff"
            textColor={colors.pinkDark}
            style={{
              border: `1px solid ${colors.pinkDark}`,
              padding: '7px 10px',
              marginTop: 0,
            }}
          />
        </div>
      )}
      <div>
        <p style={{ ...fontsize.h4, color: colors.black2, fontWeight: 600 }}>ACTIVE STAFFS</p>
        {businessStaffs.size > 0 && activeAdmin.length === 0 ? (
          <List
            dataSource={businessStaffs.size > 0 && activeAdmin.length ? activeAdmin : []}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                  }
                  title={
                    // <a href="#">{item.person.fullName}</a>
                    item.person.fullName
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <p
                style={{
                  ...typography.h4,
                  fontWeight: 600,
                  color: colors.gray,
                }}>
                No active staff yet
              </p>
              <Buttons
                btnText="Add staff"
                textColor={colors.pinkDark}
                textStyle={{
                  ...typography.captionMedium,
                }}
                style={{
                  border: `1px solid ${colors.pinkDark}`,
                  padding: '7px 10px',
                  marginTop: 0,
                }}
              />
            </div>
          </div>
        )}

        {businessStaffs.size > 0 && pendingAdmin.length > 0 && (
          <>
            <p style={{ ...fontsize.h4, color: colors.black2, fontWeight: 600 }}>PENDING STAFFS</p>
            <List
              dataSource={pendingAdmin}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                    }
                    title={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <p
                          style={{
                            ...typography.caption,
                            fontWeight: 600,
                            color: colors.black3,
                            marginBottom: 0,
                          }}>
                          {!!item.person ? item.person.fullName : item.email}
                        </p>

                        <Popover
                          placement="bottomRight"
                          content={renderPopoverContent(item._id)}
                          trigger="click">
                          <Button shape="circle" style={{ border: 'none' }}>
                            <MoreOutlined style={{ fontSize: fontsize.h4, color: colors.black3 }} />
                          </Button>
                        </Popover>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </>
        )}
        {businessStaffs.size === null && !errorMsg && (
          <Space
            style={{
              minHeight: 300,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spin />
          </Space>
        )}
        <InviteAdminStaffModal
          isVisible={addAdminModalVisible}
          role="staff"
          closeModal={() => setAddAdminModalVisible(false)}
        />
      </div>
    </div>
  );
};

// const useStyles = makeStyles({
//   addNewInvestor: {
//     height: 60,
//     width: 60,
//     borderRadius: 30,
//     backgroundColor: colors.pinkDark,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     zIndex: 10,

//     shadowColor: 'rgba(0, 0, 0, 0.3)',
//     shadowOpacity: 0.8,
//     elevation: 6,
//     shadowRadius: 15,
//     shadowOffset: { width: 1, height: 13 },
//   },
// });

export default Staffs;
