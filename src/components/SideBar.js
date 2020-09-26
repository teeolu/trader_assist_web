import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  SettingOutlined,
  UserOutlined,
  HistoryOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import { colors, fontsize, boxShadows, typography } from '../Css';
import { PrivatePaths } from '../routes';
import { existInUrl } from '../utils/url';
import { getCurrentUserState } from '../redux/auth/userRequestReducer';
import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';
import history from '../routes/history';

const { Sider } = Layout;

const CurrentBussinessInfo = ({ platformImage, platformName }) => {
  const classes = useStyles();
  return (
    <div className={classes.currentBusinessInfo}>
      <Avatar
        src={platformImage}
        size="default"
        style={{ border: `1px solid ${colors.gray}`, marginRight: 15 }}
      />
      <p style={{ ...typography.paragraph, marginBottom: 0, color: '#101820FF' }}>{platformName}</p>
    </div>
  );
};

const SideBar = ({ url }) => {
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUserState);
  const currentBusiness = useSelector(getCurrentBusinessState);

  if (!currentUser.platformDetails) return null;
  const userPlatforms =
    currentUser.platformDetails.total > 1 ? currentUser.platformDetails.docs : [];

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

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
      name: 'Investments',
      icon: VerticalAlignBottomOutlined,
      path: `${url}${PrivatePaths.INVESTMENTS}`,
    },
    {
      name: 'Returns',
      icon: VerticalAlignTopOutlined,
      path: `${url}${PrivatePaths.RETURNS}`,
    },
    {
      name: 'Settings',
      icon: SettingOutlined,
      path: `${url}${PrivatePaths.SETTINGS}`,
    },
  ];

  const DropDownMenu = (
    <Menu style={{ backgroundColor: colors.white }}>
      {userPlatforms
        .filter((platform) => platform.platformId !== currentBusiness.platformId)
        .map((platform) => {
          return (
            <Menu.Item onClick={() => history.push(`platform/${platform.platformId}`)}>
              <CurrentBussinessInfo
                platformImage={!!platform.platformImage ? platform.platformImage.secure_url : null}
                platformName={platform.platformName}
              />
            </Menu.Item>
          );
        })}
    </Menu>
  );

  return (
    <Sider
      width={250}
      style={{
        borderRight: boxShadows.border,
        height: '100%',
        backgroundColor: '#101820FF',
      }}
      theme="light">
      <Dropdown
        disabled={currentUser.platformDetails.total === 1}
        overlay={DropDownMenu}
        overlayStyle={{ background: colors.white }}>
        <div className={classes.currentBusinessName}>
          <CurrentBussinessInfo
            platformImage={
              !!currentBusiness.platformImage ? currentBusiness.platformImage.secure_url : null
            }
            platformName={currentBusiness.platformName}
          />
          <DownOutlined
            style={{
              fontSize: fontsize.h4,
              color: colors.black3,
            }}
          />
        </div>
      </Dropdown>

      {/* <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}> */}
      <Menu
        mode="inline"
        selectedKeys={[existInUrl(SideBarContents.map((el) => el.name.toLowerCase()))]}
        style={{ backgroundColor: '#101820FF' }}>
        {SideBarContents.map((el) => {
          const Icon = el.icon;
          const color = existInUrl(el.name.toLowerCase()) ? colors.pinkDark : colors.black3;

          return (
            <Menu.Item
              style={{
                height: 50,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
              }}
              key={el.name.toLowerCase()}
              icon={
                <Icon
                  style={{
                    fontSize: fontsize.h4,
                    color,
                  }}
                />
              }>
              <Link
                style={{
                  color,
                }}
                to={el.path}>
                {el.name}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>

      {/* </div> */}
      <Menu mode="inline" style={{ backgroundColor: '#101820FF' }}>
        <Menu.Item
          style={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            flex: 1,
          }}
          key="user-profile"
          icon={<UserOutlined className={classes.userProfileIcon} />}>
          <Link
            style={{
              color: colors.pinkDark,
            }}
            to={PrivatePaths.MY_PROFILE}>
            {currentUser.fullName}
          </Link>
        </Menu.Item>
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
  userProfileIcon: {
    background: colors.gray,
    paddingRight: 10,
    borderRadius: '50%',
    fontSize: fontsize.h4,
    color: colors.gray3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentBusinessName: {
    display: 'flex',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 2px 0 rgba(16, 24, 32,.2)',
    padding: '5px 10px',
    borderRadius: 5,
    background: colors.gray,
  },
  currentBusinessInfo: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default SideBar;
