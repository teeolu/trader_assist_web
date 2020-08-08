import React, { useEffect } from 'react';
import { Layout, Tooltip, Button, notification, Spin, Space, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Switch, Link } from 'react-router-dom';

import {
  getIsFetchingState,
  getInvestorsState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../../redux/investor/getInvestorsReducer';
import { colors, fontsize, boxShadows, typography, fonts } from '../../Css';
import InvestorDetails from './InvestorDetail';
import PrivateRoute from '../../routes/PrivateRoute';
import AddInvestor from './AddInvestor';
import history from '../../routes/history';
import EditInvestor from './EditInvestor';
import AddInvestment from './AddInvestment';
import { Api } from '../../repository/Api';
import { notificationConfigs } from '../../constants/ToastNotifincation';
const { Content } = Layout;

const Investors = (props) => {
  let {
    match: { url, path },
  } = props;
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investorsData = useSelector(getInvestorsState);

  useEffect(() => {
    fetchInvestors();
    // eslint-disable-next-line
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

  useEffect(() => {
    if (
      props.location.pathname === path &&
      investorsData.size !== null &&
      investorsData.size !== 0
    ) {
      history.push(`${url}/${investorsData.investors[0]._id}`);
    }
    // eslint-disable-next-line
  }, [investorsData]);

  function fetchInvestors(search = '') {
    Api.InvestorRepository.getInvestors({
      params: {
        search,
      },
    });
  }
  const classes = useStyles();

  function renderInvestorsList() {
    return (
      <div className={classes.inventorListContainer}>
        {investorsData.investors.map((investor, i) => {
          const idFromParam = !!props.location.pathname.split(`${url}/`)[1]
            ? props.location.pathname.split(`${url}/`)[1].split('/')[0]
            : null;
          const isActive = investor.investorId === idFromParam;
          return (
            <Link to={`${url}/${investor.investorId}`}>
              <div
                key={investor.investorId}
                className={classes.investorContainer}
                // onClick={() => history.push(`${url}/${investor.investorId}`)}
                style={{
                  backgroundColor: isActive && colors.pinkLight,
                  borderLeft: `3px solid ${isActive ? colors.pinkDark : 'transparent'}`,
                }}>
                <div className={classes.investorIsActiveIndicator}>
                  an
                  <div
                    style={{
                      backgroundColor: colors.green,
                    }}></div>
                </div>
                <div className={classes.investorInfo}>
                  <p
                    style={{
                      ...typography.paragraph,
                      fontFamily: fonts.semiBold,
                      marginBottom: 0,
                    }}>
                    {investor.investorFullName}
                  </p>
                  <p style={{ ...typography.caption, marginBottom: 0 }}>
                    Added on tuesday, 13 2020
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <Content style={{}}>
      <Row gutter={0}>
        <Col span={7}>
          <Card
            bodyStyle={{ padding: 0, height: 'calc(100vh - 64px)' }}
            style={{
              position: 'sticky',
              top: 0,
            }}>
            <div className={classes.investors}>
              <div className={classes.investorsHeading}>
                <p className={classes.investorText}>
                  <b>Investors</b>
                </p>
                <Tooltip title="Add investor" placement="bottom">
                  <Button
                    type="primary"
                    shape="circle"
                    style={{ backgroundColor: colors.pinkLight, border: 'none' }}
                    icon={
                      <Link to={`${url}/new-investor`}>
                        <PlusSquareOutlined
                          style={{ color: colors.pinkDark, fontSize: fontsize.h4 }}
                        />
                      </Link>
                    }
                  />
                </Tooltip>
              </div>
              {isFetching && investorsData.size === null && (
                <Space
                  style={{
                    width: '100%',
                    minHeight: 300,
                    justifyContent: 'center',
                  }}>
                  <Spin />
                </Space>
              )}
              {renderInvestorsList()}
            </div>
          </Card>
        </Col>
        <Col span={17} style={{}}>
          <Card bodyStyle={{ padding: 0 }}>
            <Switch>
              <PrivateRoute path={`${url}/new-investor`} exact={true} component={AddInvestor} />
              <PrivateRoute path={`${url}/:investorId`} exact={true} component={InvestorDetails} />
              <PrivateRoute
                path={`${url}/:investorId/new-investment`}
                exact={true}
                component={AddInvestment}
              />
              <PrivateRoute
                path={`${url}/:investorId/edit-investor`}
                exact={true}
                component={EditInvestor}
              />
            </Switch>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

const useStyles = makeStyles({
  overviewContainer: {
    display: 'flex',
    height: '100%',
  },
  investors: {
    // height: '100%',
    // width: '100%',
    // borderRight: boxShadows.border,
    // display: 'flex',
    // flexDirection: 'column',
  },
  investorsHeading: {
    padding: 15,
    width: '100%',
    height: 50,
    borderBottom: boxShadows.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  investorContainer: {
    transition: '.3s all',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: colors.gray2,
    },
  },
  investorText: {
    ...typography.h4,
    marginBottom: 0,
    fontWeight: 600,
    color: colors.black2,
    letterSpacing: '1px',
  },
  inventorListContainer: {
    height: '100%',
    overflowY: 'scroll',
    '& > div': {
      padding: 5,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:not(:last-child)': {
        borderBottom: boxShadows.border,
      },
    },
  },
  investorInfo: {
    marginLeft: 10,
  },
  investorIsActiveIndicator: {
    ...typography.paragraphGray,
    fontFamily: fonts.regular,
    fontSize: fontsize.h4,
    height: 40,
    width: 40,
    borderRadius: 56,
    backgroundColor: colors.pinkDark,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    '& div': {
      height: 15,
      width: 15,
      borderRadius: 10,
      border: `3px solid ${colors.white}`,
      position: 'absolute',
      bottom: -2,
      right: -2,
    },
  },
  investorsDetail: {
    flex: 5,
    height: '100%',
    width: '100%',
    backgroundColor: colors.white,
    overflowY: 'scroll',
  },
});

export default Investors;
