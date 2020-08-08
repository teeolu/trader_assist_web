import React from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  UploadOutlined,
  DownloadOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import { colors, fontsize, boxShadows } from '../Css';
import { PrivatePaths } from '../routes';
import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';

const { Sider } = Layout;

const SideBar = ({ collapsed, match }) => {
  let { path } = match;
  const classes = useStyles();
  const currentBusiness = useSelector(getCurrentBusinessState);
  console.log('currentUser currentUser currentUser ', path);
  if (!currentBusiness.platformId) return null;

  const SideBarContents = [
    {
      name: 'Overview',
      icon: DashboardOutlined,
      path: `platform/${currentBusiness.platformId}${PrivatePaths.OVERVIEW}`,
    },
    {
      name: 'Investors',
      icon: UsergroupAddOutlined,
      path: `platform/${currentBusiness.platformId}${PrivatePaths.INVESTORS}`,
    },
    {
      name: 'Returns',
      icon: UploadOutlined,
      path: `platform/${currentBusiness.platformId}${PrivatePaths.RETURNS}`,
    },
    {
      name: 'Investments',
      icon: DownloadOutlined,
      path: `platform/${currentBusiness.platformId}${PrivatePaths.INVESTMENTS}`,
    },
    {
      name: 'Settings',
      icon: SettingOutlined,
      path: `platform/${currentBusiness.platformId}${PrivatePaths.SETTINGS}`,
    },
  ];

  const currentView = window.location.href
    .replace(new RegExp(`${window.location.origin}/|/$`, 'g'), '')
    .trim()
    .split('/')
    .pop();

  if (currentView === PrivatePaths.CREATE_PLATFORM.split('/').pop()) return null;
  if (currentView === PrivatePaths.MY_PROFILE.split('/').pop()) return null;
  return (
    <Sider
      style={{
        borderRight: boxShadows.border,
        height: '100%',
      }}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Menu mode="inline" selectedKeys={[currentView]} style={{ flex: 1 }}>
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
              <Link to={PrivatePaths.MY_PROFILE}>Olusola Oyinloye</Link>
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
