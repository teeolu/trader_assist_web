import React from 'react';
import { Switch } from 'react-router-dom';
import { Layout, Row, Col, Card, Menu } from 'antd';

import { colors, typography } from '../../Css';
import { PrivatePaths } from '../../routes';
import history from '../../routes/history';
import PrivateRoute from '../../routes/PrivateRoute';
import Staffs from './Team/Staffs';
import Admins from './Team/Admins';

const { Content } = Layout;

const Settings = (props) => {
  let {
    match: { path },
    location: { pathname },
  } = props;

  const SideBarContents = [
    {
      name: 'Teams',
      path: PrivatePaths.OVERVIEW,
      subMenu: [
        {
          name: 'Staffs',
          path: `${path}/staffs`,
        },
        {
          name: 'Admins',
          path: `${path}/admins`,
        },
      ],
    },
    {
      name: 'Platform',
      path: PrivatePaths.OVERVIEW,
      subMenu: [
        {
          name: 'Staffs',
        },
        {
          name: 'Admins',
        },
      ],
    },
    {
      name: 'My profile',
      subMenu: [
        {
          name: 'Edit profile',
        },
        {
          name: 'Reset password',
        },
      ],
    },
  ];

  return (
    <Content>
      <Row gutter={0}>
        <Col span={5}>
          <Card
            bodyStyle={{ paddingRight: 0 }}
            style={{
              minHeight: 'calc(100vh - 64px)',
              position: 'sticky',
              top: 20,
            }}>
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={'none'}
              inlineIndent={0}
              style={{ flex: 1 }}>
              {SideBarContents.map((el) => {
                if (!!el.subMenu) {
                  return (
                    <Menu.SubMenu
                      style={{
                        color: colors.black2,
                        fontWeight: 600,
                      }}
                      key={el.name}
                      title={el.name}>
                      {el.subMenu.map((menu) => (
                        <Menu.Item
                          onClick={() => history.push(menu.path)}
                          style={{
                            ...typography.caption,
                            backgroundColor:
                              pathname === menu.path ? colors.pinkLight : 'transparent',
                            color: colors.black2,
                            padding: '0 0 0 10px',
                            fontWeight: 400,
                            height: 40,
                            paddingLeft: '10px !important',
                          }}
                          key={menu.name}>
                          {menu.name}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  );
                }
                return (
                  <Menu.Item
                    // onClick={() => history.push(el.path)}
                    style={{
                      color: colors.black2,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    key={el.name.toLowerCase().trim().replace(/\s/, '-')}>
                    {el.name}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Card>
        </Col>
        <Col span={19}>
          <Card
            style={{
              minHeight: 'calc(100vh - 64px)',
            }}>
            <Switch>
              <PrivateRoute path={`${path}/staffs`} exact={true} component={Staffs} />
            </Switch>
            <Switch>
              <PrivateRoute path={`${path}/admins`} exact={true} component={Admins} />
            </Switch>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

// const useStyles = makeStyles({
//   activeRow: {
//     backgroundColor: colors.pinkLight,
//   },
// });

export default Settings;
