import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  UploadOutlined,
  DownloadOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { colors, fontsize, boxShadows } from '../Css';
import { PrivatePaths } from '../routes';
import history from '../routes/history';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const classes = useStyles();

  function toggle() {
    setCollapsed(!collapsed);
  }

  const SideBarContents = [
    { name: 'Overview', icon: DashboardOutlined, path: PrivatePaths.OVERVIEW },
    { name: 'Investors', icon: UsergroupAddOutlined, path: PrivatePaths.INVESTORS },
    {
      name: 'Returns',
      icon: UploadOutlined,
      path: PrivatePaths.RETURNS,
    },
    {
      name: 'Investments',
      icon: DownloadOutlined,
      path: PrivatePaths.INVESTMENTS,
    },
    {
      name: 'Settings',
      icon: SettingOutlined,
      path: PrivatePaths.SETTINGS,
    },
  ];

  const currentView = window.location.href
    .replace(new RegExp(`${window.location.origin}/|/$`, 'g'), '')
    .trim()
    .split('/')[0];

  return (
    <Sider
      style={{
        borderRight: boxShadows.border,
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
        <div className="logo" style={{ height: '32px', color: colors.white, margin: '16px' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            style: {
              color: colors.pinkDark,
              fontSize: fontsize.h4,
              marginLeft: 8,
            },
          })}
        </div>
        <Menu theme="light" mode="inline" selectedKeys={[currentView]} style={{ flex: 1 }}>
          {SideBarContents.map((el) => {
            const Icon = el.icon;
            return (
              <Menu.Item
                onClick={() => history.push(el.path)}
                style={{
                  height: 50,
                  color: colors.black2,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                }}
                key={el.name.toLowerCase().trim().replace(/\s/, '-')}
                icon={
                  <Icon
                    style={{
                      fontSize: fontsize.h4,
                      color: colors.black,
                    }}
                  />
                }>
                {el.name}
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
              icon={
                <UserOutlined
                  style={{
                    background: colors.gray,
                    padding: 10,
                    borderRadius: '50%',
                    fontSize: fontsize.h4,
                    color: colors.gray3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              }>
              Olusola Oyinloye
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
});

export default SideBar;
