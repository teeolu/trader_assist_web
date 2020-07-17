import React from 'react';
import { useSelector } from 'react-redux';

import { PrivatePaths } from '../../routes';
import Investors from '../investors';
import Overview from '../overview';
import Returns from '../returns';
import Investments from '../investments';
import Settings from '../settings';
import PrivateRoute from '../../routes/PrivateRoute';
import { getCurrentBusinessState } from '../../redux/business/addBusinessReducer';

export default (props) => {
  let {
    match: { params },
  } = props;
  const currentBusiness = useSelector(getCurrentBusinessState);
  if (!params || !params.platformName || !currentBusiness.businessName) return null;
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
        const path = `/${params.platformName}${route.path}`;
        return <PrivateRoute path={path} exact={true} component={route.component} />;
      })}
    </>
  );
};
