import React, { useEffect } from 'react';
import { Alert, Spin } from 'antd';
import { useSelector } from 'react-redux';

import '../assets/verifyUser.css';
import { Api } from '../repository/Api';
import {
  getIsFetchingState,
  getErrorMessageState,
  getStatusState,
  Status,
} from '../redux/auth/approveUserReducer';
import Buttons from '../atoms/Buttons';
import history from '../routes/history';
import { PublicPaths } from '../routes';

export default (props) => {
  let {
    match: { params },
  } = props;
  const token = !!params ? params.id : null;

  const isFetching = useSelector(getIsFetchingState);
  const errorMsg = useSelector(getErrorMessageState);
  const status = useSelector(getStatusState);

  useEffect(() => {
    if (!!token) {
      Api.AuthRepository.approveUser(token);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-container">
      <main className="main">
        {isFetching ? (
          <div className="main-container">
            <Spin />
          </div>
        ) : status === Status.LOGIN_REQUEST_FAILURE ? (
          <div className="main-container">
            <Alert
              message="Invalid request"
              description={errorMsg}
              type="error"
              style={{ marginBottom: 20 }}
            />
          </div>
        ) : (
          <>
            <h1 className="h1">Welcome</h1>
            <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
              Your email has been verified successfully. You can proceed to login to continue
            </p>

            <Buttons
              btnText="Login"
              style={{
                paddingRight: 50,
                paddingLeft: 50,
                borderRadius: 50,
                height: 40,
              }}
              type="primary"
              btnAction={() => history.push(PublicPaths.LOGIN)}
            />
          </>
        )}
      </main>
    </div>
  );
};
