import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Layout, Row, Col, Card, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { colors, typography, fonts, boxShadows, fontsize } from '../../Css';
import { getCurrentUserState, getIsFetchingState } from '../../redux/auth/userRequestReducer';
import { Api } from '../../repository/Api';
import Buttons from '../../atoms/Buttons';
import history from '../../routes/history';
import { PrivatePaths } from '../../routes';
import Loading from '../../atoms/Loading';

const { Content } = Layout;

const UserProfile = (props) => {
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUserState);
  const isFetching = useSelector(getIsFetchingState);

  useEffect(() => {
    Api.AuthRepository.requestUser();
  }, []);

  if (isFetching) return <Loading />;

  const platforms = !!currentUser
    ? !!currentUser.platformDetails
      ? currentUser.platformDetails.docs
      : null
    : null;

  return (
    <Content
      style={{
        backgroundImage: `linear-gradient(180deg, #101820FF 40%, ${colors.white} 30%)`,
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '20px 50px',
        }}>
        <p style={{ ...typography.h3, margin: 0, color: colors.gray }}>
          Welcome {!!currentUser && currentUser.fullName}!
        </p>
        <Buttons
          btnText="Create platform"
          // isLoading={isFetching}
          btnAction={() => history.push(PrivatePaths.CREATE_PLATFORM)}
          style={{
            paddingRight: 50,
            paddingLeft: 50,
            borderRadius: 50,
            height: 40,
          }}
          type="primary"
          // htmlType="submit"
        />
      </div>
      <div
        style={{
          display: 'flex',
          margin: '20px 50px',
          fontSize: fontsize.h4,
        }}>
        {['Platforms', 'Notification', 'Settings'].map((el, i) => {
          const isActive = i === 0;
          const color = isActive ? colors.gray : colors.black3;
          return (
            <p
              style={{
                ...typography.paragraph,
                paddingRight: 30,
                paddingBottom: 10,
                marginRight: 10,
                color,
                borderBottom: isActive && `3px solid ${color}`,
              }}>
              {el}
            </p>
          );
        })}
      </div>
      <Card
        style={{ border: boxShadows.border, borderRadius: 10, padding: 20, margin: '20px 50px' }}>
        <Row gutter={20}>
          {!!platforms
            ? platforms.map((platform) => {
                return (
                  <Col key={platform.platformId} span={6} className={classes.businessCard}>
                    <div>
                      <Link to={`platform/${platform.platformId}/overview`}>
                        <Avatar
                          size="large"
                          style={{ marginBottom: 5 }}
                          src={platform.platformImage.secure_url}
                          alt={platform.platformName}
                        />
                        <p style={{ margin: 0, font: fonts.regular, color: '#101820FF' }}>
                          {platform.platformName}
                        </p>
                        <p style={{ ...typography.caption, margin: 0, font: fonts.regular }}>
                          {platform.role}
                        </p>
                      </Link>
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>
      </Card>
      {!!currentUser.businessAsStaff && currentUser.businessAsStaff.length === 0 && (
        <div>
          <p style={{ ...typography.h4 }}>
            You are not attached to any platform yet! Add a platform to continue
          </p>
        </div>
      )}
      <div className={classes.footer}>
        <div>Copyright &copy;{new Date().getFullYear()} Trader assist - All rights reserved</div>
      </div>
    </Content>
  );
};

const useStyles = makeStyles({
  activeRow: {
    backgroundColor: colors.pinkLight,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    marginTop: 'auto',
    alignItems: 'center',
    '& div': {
      margin: 20,
      fontWeight: 500,
      fontSize: 14,
      color: '#101820FF',
    },
  },
  businessCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 10,
    // height: 200,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: 'none',
    border: boxShadows.border,
    transition: '.3s all',
    '&:hover': {
      boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);',
    },
    '& > div': {
      ...typography.h3,
      padding: 20,
      flex: 3,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
});

export default UserProfile;
