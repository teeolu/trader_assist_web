import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  UploadOutlined,
  DownloadOutlined,
  SettingOutlined,
  UserOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import { colors, fontsize, boxShadows } from '../Css';
import { PrivatePaths } from '../routes';
import { existInUrl } from '../utils/url';
import { getCurrentUserState } from '../redux/auth/userRequestReducer';

const { Sider } = Layout;

const SideBar = ({ url }) => {
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUserState);

  const SideBarContents = [
    {
      name: 'Overview',
      icon: DashboardOutlined,
      path: `${url}${PrivatePaths.OVERVIEW}`,
    },
    {
      name: 'Investors',
      icon: UsergroupAddOutlined,
      path: `${url}${PrivatePaths.INVESTORS}`,
    },
    {
      name: 'Activities',
      icon: HistoryOutlined,
      path: `${url}${PrivatePaths.ACTIVITIES}`,
    },
    {
      name: 'Returns',
      icon: UploadOutlined,
      path: `${url}${PrivatePaths.RETURNS}`,
    },
    {
      name: 'Investments',
      icon: DownloadOutlined,
      path: `${url}${PrivatePaths.INVESTMENTS}`,
    },
    {
      name: 'Settings',
      icon: SettingOutlined,
      path: `${url}${PrivatePaths.SETTINGS}`,
    },
  ];

  return (
    <Sider
      style={{
        borderRight: boxShadows.border,
        height: '100%',
      }}
      theme="light">
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Menu
          mode="inline"
          selectedKeys={[existInUrl(SideBarContents.map((el) => el.name.toLowerCase()))]}
          style={{ flex: 1 }}>
          {SideBarContents.map((el) => {
            const Icon = el.icon;
            return (
              <Menu.Item
                style={{
                  height: 50,
                  color: colors.black2,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                }}
                key={el.name.toLowerCase()}
                icon={
                  <Icon
                    style={{
                      fontSize: fontsize.h4,
                      color: colors.black,
                    }}
                  />
                }>
                <Link to={el.path}>{el.name}</Link>
              </Menu.Item>
            );
          })}
        </Menu>

        <div style={{ marginTop: 'auto', height: 'max-content', marginBottom: 50 }}>
          <Menu theme="light" selectedKeys="none" mode="inline" inlineIndent={15}>
            <Menu.Item
              style={{
                height: 'max-content',
                color: colors.black2,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
              }}
              key="user-profile"
              icon={<UserOutlined className={classes.userProfileIcon} />}>
              <Link to={PrivatePaths.MY_PROFILE}>{currentUser.fullName}</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

const useStyles = makeStyles({
  menuItem: {
    borderRadius: 5,
    padding: '17px 30px',
    border: 'none',
    height: 'auto',
    width: 'auto',
    marginTop: 20,
  },
  menuIcon: {
    fontSize: fontsize.h4,
  },
  userProfileIcon: {
    background: colors.gray,
    padding: 10,
    borderRadius: '50%',
    fontSize: fontsize.h4,
    color: colors.gray3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SideBar;
