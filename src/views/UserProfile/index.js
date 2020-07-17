import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Layout, Row, Col, Avatar } from 'antd';
import { useSelector } from 'react-redux';

import { colors, boxShadows, typography, fonts } from '../../Css';
import { getCurrentUserState } from '../../redux/auth/userRequestReducer';
import { Api } from '../../repository/Api';
import Buttons from '../../atoms/Buttons';
import history from '../../routes/history';
import { PrivatePaths } from '../../routes';

const { Content } = Layout;

const UserProfile = (props) => {
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUserState);
  useEffect(() => {
    Api.AuthRepository.requestUser();
  }, []);
  return (
    <Content style={{ padding: 20 }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}>
        <p style={{ ...typography.h3, margin: 0 }}>
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
            margin: 0,
          }}
          type="primary"
          // htmlType="submit"
        />
      </div>
      <Row gutter={20}>
        {!!currentUser
          ? !!currentUser.businessAsStaff &&
            currentUser.businessAsStaff.map((business) => {
              return (
                <Col
                  onClick={() =>
                    history.push(`${business.business.businessName.split(' ').join('.')}/overview`)
                  }
                  key={business._id}
                  span={6}
                  className={classes.businessCard}>
                  <div>
                    <Avatar
                      size="large"
                      style={{ marginBottom: 10 }}
                      src={business.business.businessImage.secure_url}
                      alt={business.business.businessName}
                    />
                    <p style={{ margin: 0, font: fonts.regular }}>
                      {business.business.businessName}
                    </p>
                    <p style={{ ...typography.caption, margin: 0, font: fonts.regular }}>
                      {business.role}
                    </p>
                  </div>
                </Col>
              );
            })
          : null}
      </Row>
      {!!currentUser.businessAsStaff && currentUser.businessAsStaff.length === 0 && (
        <div>
          <p style={{ ...typography.h4 }}>
            You are not attached to any platform yet! Add a platform to continue
          </p>
        </div>
      )}
    </Content>
  );
};

const useStyles = makeStyles({
  activeRow: {
    backgroundColor: colors.pinkLight,
  },
  businessCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);',
    borderRadius: 10,
    cursor: 'pointer',
    transition: '.3s all',
    '&:hover': {
      boxShadow: 'none',
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
