import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import { PrivatePaths } from '../../routes';
import Investors from '../investors';
import Overview from '../overview';
import Returns from '../returns';
import Investments from '../investments';
import Settings from '../settings';
import PrivateRoute from '../../routes/PrivateRoute';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';
import { getIsFetchingState } from '../../redux/business/getBusinessReducer';
import { Api } from '../../repository/Api';
import SideBar from '../../components/SideBar';
import NavHeader from '../../components/NavHeader';
import Activities from '../Activities';
import Loading from '../../atoms/Loading';

export default (props) => {
  let {
    match: { params, path, url },
  } = props;
  const currentBusiness = useSelector(getCurrentBusinessState);
  const isFetching = useSelector(getIsFetchingState);

  useEffect(() => {
    Api.AuthRepository.requestUser();
    if (!!params.platformId) {
      Api.BusinessRepository.getBusiness({ platformId: params.platformId }).then((res) => {
        if (!res) {
          Api.BusinessRepository.getBusinessOverview({
            businessId: params.platformId,
          });
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  if (isFetching) return <Loading />;
  if (!params || !params.platformId || !currentBusiness.platformId) return null;
  const businessRoutes = [
    { path: PrivatePaths.INVESTORS, exact: false, component: Investors },
    { path: PrivatePaths.OVERVIEW, exact: false, component: Overview },
    { path: PrivatePaths.RETURNS, exact: false, component: Returns },
    { path: PrivatePaths.INVESTMENTS, exact: false, component: Investments },
    { path: PrivatePaths.ACTIVITIES, exact: false, component: Activities },
    { path: PrivatePaths.SETTINGS, exact: false, component: Settings },
  ];
  return (
    <>
      <SideBar url={url} />
      <Layout className="site-layout" style={{ height: '100%' }}>
        <NavHeader />
        {businessRoutes.map((route) => {
          const routePath = `${path}${route.path}`;
          return <PrivateRoute path={routePath} exact={route.exact} component={route.component} />;
        })}
      </Layout>
    </>
  );
};
