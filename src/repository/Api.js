/** @format */

import axios from 'axios';
import { AuthRepository } from './authRepository';
import { InvestorRepository } from './investorRepository';
import { BusinessRepository } from './businessRepository';
import { InvestmentRepository } from './investmentRepository';
import { ReturnsRepository } from './returnsRepository';
import { MiscRepository } from './miscRepository';
import { SettingsRepository } from './settingsRepository';
import Auth from '../utils/auth';
import history from '../routes/history';
import { PublicPaths } from '../routes';

const config = {
  baseURL: `https://trader-assistant-backend.herokuapp.com/trader-assistant`, //`http://localhost:4000/trader-assistant`, //
};

export const instance = axios.create(config);

if (Auth.isAuthenticated() === true) {
  instance.defaults.headers.common['authorization'] = `Bearer ${Auth.getToken()}`;
}

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!!error.response) {
      if (error.response.status === 401) {
        // store.dispatch({
        //   type: SET_CURRENT_USER,
        //   payload: {},
        // });
        // store.dispatch({
        //   type: SET_CURRENT_BUSINESS,
        //   payload: {},
        // });
        // Auth.removeToken();
        // Auth.removeCurrentBusiness();
        history.push(PublicPaths.ERROR_UNAUTHORIZED);
        return;
      }
      if (error.response.status === 500) {
        // history.push(PublicPaths.SERVER_ERROR);
        // return;
      }
      return Promise.reject(error.response.data);
    }
    throw new Error('An error occured');
  },
);

export const Api = {
  AuthRepository: AuthRepository(instance),
  InvestorRepository: InvestorRepository(instance),
  BusinessRepository: BusinessRepository(instance),
  InvestmentRepository: InvestmentRepository(instance),
  ReturnsRepository: ReturnsRepository(instance),
  MiscRepository: MiscRepository(instance),
  SettingsRepository: SettingsRepository(instance),
};
