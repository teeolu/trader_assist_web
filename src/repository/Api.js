/** @format */

import axios from 'axios';
import { AuthRepository } from './authRepository';
import { InvestorRepository } from './investorRepository';
import { BusinessRepository } from './businessRepository';
import { InvestmentRepository } from './investmentRepository';
import { ReturnsRepository } from './returnsRepository';
import { MiscRepository } from './miscRepository';
import { SettingsRepository } from './settingsRepository';

const config = {
  baseURL: `http://localhost:5000`,
};

const instance = axios.create(config);

export const Api = {
  AuthRepository: AuthRepository(instance),
  InvestorRepository: InvestorRepository(instance),
  BusinessRepository: BusinessRepository(instance),
  InvestmentRepository: InvestmentRepository(instance),
  ReturnsRepository: ReturnsRepository(instance),
  MiscRepository: MiscRepository(instance),
  SettingsRepository: SettingsRepository(instance),
};
