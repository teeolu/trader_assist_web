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
import store from '../redux/store';
import { SET_CURRENT_USER } from '../redux/auth/actionTypes';
import { SET_CURRENT_BUSINESS } from '../redux/business/actionTypes';
import history from '../routes/history';
import { PublicPaths } from '../routes';

const config = {
  baseURL: `http://localhost:5000`,
  // withCredentials: true,
};

const instance = axios.create(config);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('shjhskhskjhsjhsk error.response.data ', error.response);
    if (error.response.status === 401) {
      // store.dispatch({
      //   type: SET_CURRENT_USER,
      //   payload: {},
      // });
      // store.dispatch({
      //   type: SET_CURRENT_BUSINESS,
      //   payload: {},
      // });
      Auth.removeToken();
      Auth.removeCurrentBusiness();
      history.push(PublicPaths.ERROR_UNAUTHORIZED);
      return;
    }
    if (!!error.response) {
      return Promise.reject(error.response.data);
    }
    throw new Error('An error occured');
  },
);

instance.interceptors.request.use((config) => {
  config.params = { ...config.params, token: Auth.getToken() };
  return config;
});

export const Api = {
  AuthRepository: AuthRepository(instance),
  InvestorRepository: InvestorRepository(instance),
  BusinessRepository: BusinessRepository(instance),
  InvestmentRepository: InvestmentRepository(instance),
  ReturnsRepository: ReturnsRepository(instance),
  MiscRepository: MiscRepository(instance),
  SettingsRepository: SettingsRepository(instance),
};
