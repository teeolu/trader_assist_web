import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  UploadOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { colors, fontsize, boxShadows } from '../Css';
import { PrivatePaths } from '../routes';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const classes = useStyles();

  function toggle() {
    setCollapsed(!collapsed);
  }

  const SideBarContents = [
    { name: 'Overview', icon: DashboardOutlined, path: PrivatePaths.INVESTORS },
    { name: 'Investors', icon: UsergroupAddOutlined, path: PrivatePaths.ASSESSMENT },
    {
      name: 'Returns',
      icon: UploadOutlined,
      path: PrivatePaths.CONTACT_TRACE,
    },
    {
      name: 'Investments',
      icon: DownloadOutlined,
      path: PrivatePaths.CASE_MANAGEMENT,
    },
    {
      name: 'Settings',
      icon: SettingOutlined,
      path: PrivatePaths.PARTNERS,
    },
  ];

  return (
    <Sider
      style={{ borderRight: boxShadows.border }}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}>
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
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        {SideBarContents.map((el) => {
          const Icon = el.icon;
          return (
            <Menu.Item key={el.name} icon={<Icon />}>
              {el.name}
            </Menu.Item>
          );
        })}
      </Menu>
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
