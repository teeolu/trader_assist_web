import React, { useEffect } from 'react';
import { Layout, Avatar, Row, Col, Button, Badge, Input } from 'antd';
// import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  WechatOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { fontsize, boxShadows, typography, colors } from '../Css';
import { getCurrentBusinessState } from '../redux/business/addBusinessReducer';
import { PrivatePaths, PublicPaths } from '../routes';
import { Api } from '../repository/Api';

const { Header } = Layout;
const { Search } = Input;

const NavHeader = ({ toggle, collapsed, match }) => {
  const businessName = window.location.pathname.split('/')[1];
  const currentView = window.location.href
    .replace(new RegExp(`${window.location.origin}/|/$`, 'g'), '')
    .trim()
    .split('/')[0];
  const currentBusiness = useSelector(getCurrentBusinessState);

  useEffect(() => {
    if (!currentBusiness.businessImage) {
      if (`/${currentView}` !== PrivatePaths.MY_PROFILE) {
        Api.BusinessRepository.getBusiness({ businessName });
      }
    }
  }, [businessName, currentBusiness]);

  if (`/${currentView}` === PrivatePaths.MY_PROFILE) return null;
  if (`/${currentView}` === PublicPaths.LOGIN) return null;
  if (`/${currentView}` === PublicPaths.REGISTER) return null;
  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background header"
        style={{
          padding: 0,
          borderBottom: boxShadows.border,
          display: 'flex',
          alignItems: 'center',
        }}>
        <Row
          style={{
            width: '100%',
          }}
          gutter={20}>
          <Col
            span={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingRight: 30,
            }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
              style: {
                color: colors.pinkDark,
                fontSize: fontsize.h4,
                marginLeft: 20,
                marginRight: 20,
              },
            })}
            <Button style={{ margin: '0 5px' }} shape="circle">
              <Badge style={{ backgroundColor: colors.pinkDark }} count={1}>
                <BellOutlined size="large" style={{ fontSize: fontsize.h4, color: colors.pink }} />
              </Badge>
            </Button>
            <Button style={{ margin: '0 5px' }} shape="circle">
              <WechatOutlined style={{ fontSize: fontsize.h4, color: colors.pink }} />
            </Button>
            <Button style={{ margin: '0 5px' }} shape="circle">
              <MailOutlined style={{ fontSize: fontsize.h4, color: colors.pink }} />
            </Button>
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              enterButton
              style={{
                marginLeft: 50,
              }}
            />
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingLeft: 30,
            }}>
            <p style={{ ...typography.h4, marginBottom: 0, marginLeft: 10 }}>
              {currentBusiness.businessName}
            </p>
            <Avatar
              src={
                !!currentBusiness.businessImage ? currentBusiness.businessImage.secure_url : null
              }
              size="large"
              style={{ border: `1px solid ${colors.gray}`, marginLeft: 20, marginRight: 20 }}
            />
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

// const useStyles = makeStyles({
//   menuItem: {
//     borderRadius: 5,
//     padding: '17px 30px',
//     border: 'none',
//     height: 'auto',
//     width: 'auto',
//     marginTop: 20,
//   },
//   menuIcon: {
//     fontSize: fontsize.h4,
//   },
// });

export default NavHeader;
