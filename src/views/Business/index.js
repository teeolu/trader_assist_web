import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PrivatePaths } from '../../routes';
import Investors from '../investors';
import Overview from '../overview';
import Returns from '../returns';
import Investments from '../investments';
import Settings from '../settings';
import PrivateRoute from '../../routes/PrivateRoute';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';
import { Api } from '../../repository/Api';

export default (props) => {
  let {
    match: { params },
  } = props;
  // useEffect(() => {
  //   Api.BusinessRepository.getBusiness
  //   return () => {
  //     cleanup
  //   }
  // }, [input])
  const currentBusiness = useSelector(getCurrentBusinessState);
  console.log('currentUser currentUser currentUser ', params);

  useEffect(() => {
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
  if (!params || !params.platformId || !currentBusiness.platformId) return null;
  const businessRoutes = [
    { path: PrivatePaths.INVESTORS, exact: false, component: Investors },
    { path: PrivatePaths.OVERVIEW, exact: false, component: Overview },
    { path: PrivatePaths.RETURNS, exact: false, component: Returns },
    { path: PrivatePaths.INVESTMENTS, exact: false, component: Investments },
    { path: PrivatePaths.SETTINGS, exact: false, component: Settings },
  ];
  return (
    <>
      {businessRoutes.map((route) => {
        const path = `/platform/${params.platformId}${route.path}`;
        return <PrivateRoute path={path} exact={route.exact} component={route.component} />;
      })}
    </>
  );
};
