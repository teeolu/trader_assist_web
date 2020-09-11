import React, { useEffect } from 'react';
import { Layout, Tooltip, Button, notification, Spin, Space, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  PlusSquareOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { Switch, Link, Route } from 'react-router-dom';

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
import { existInUrl } from '../../utils/url';
const { Content } = Layout;

const Investors = (props) => {
  let {
    match: { url, path },
  } = props;
  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);
  const investorsData = useSelector(getInvestorsState);

  const colorPairs = ['#f8b703', '#0fa2a9', '#949217', '#7d3865', '#d7743b'];

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
        // search,
      },
    });
  }
  const classes = useStyles();

  function renderEmptyInvestorView() {
    return (
      <div
        style={{
          ...typography.caption,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <p>Details of an investor will appear here </p>
        <p style={{ color: colors.black }}>Click on an investor to view the investor details</p>
        <p style={{ color: colors.black }}>
          Or <Link to={`${url}/new-investor`}>Add an Investor</Link> to start
        </p>
      </div>
    );
  }

  function renderInvestorsList() {
    return (
      <div className={classes.inventorListContainer}>
        {investorsData.investors.map((investor, i) => {
          const isActive = existInUrl(investor.investorId) === investor.investorId;
          const bgColor = colorPairs[Math.floor(Math.random() * Math.floor(5))];
          return (
            <div
              key={investor.investorId}
              className={classes.investorContainer}
              onClick={() => history.push(`${url}/${investor.investorId}`)}
              style={{
                backgroundColor: isActive && colors.gray3,
              }}>
              <div
                style={{
                  backgroundColor: bgColor,
                  color: colors.white,
                }}
                className={classes.investorIsActiveIndicator}>
                {investor.investorFullName[0]}
                <div
                  style={{
                    backgroundColor:
                      investor.meta.numberOfInvestment > 0 ? colors.green : colors.red,
                  }}></div>
              </div>
              <div className={classes.investorInfo}>
                <Row style={{ alignItems: 'center' }}>
                  <Col span={16}>
                    <p
                      style={{
                        marginBottom: 0,
                        color: colors.black,
                        textTransform: 'capitalize',
                        fontSize: '1.2em',
                      }}>
                      {investor.investorFullName}
                    </p>
                  </Col>
                  <Col span={8}>
                    <Row justify="space-around">
                      <Col span={12} style={{ ...typography.caption }}>
                        {investor.meta.numberOfInvestment} <VerticalAlignBottomOutlined />
                      </Col>
                      <Col span={12} style={{ ...typography.caption }}>
                        {investor.meta.numberOfReturns} <VerticalAlignTopOutlined />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <p style={{ ...typography.caption, marginBottom: 0 }}>Added on tuesday, 13 2020</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Content style={{ height: '100%' }}>
      <Row gutter={0}>
        <Col span={8}>
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
        <Col span={16} style={{ backgroundColor: colors.white }}>
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
            <Route render={renderEmptyInvestorView} />
          </Switch>
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    // position: 'fixed',
  },
  investorsHeading: {
    padding: 15,
    width: '100%',
    height: 70,
    borderBottom: boxShadows.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  investorContainer: {
    transition: '.3s all',
    backgroundColor: 'transparent',
    padding: 15,
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
    flex: 1,
    overflowY: 'scroll',
    '& > div': {
      padding: 15,
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
    width: '100%',
  },
  investorIsActiveIndicator: {
    ...typography.paragraphGray,
    fontFamily: fonts.regular,
    fontSize: fontsize.h4,
    height: 40,
    width: 40,
    borderRadius: 56,
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
