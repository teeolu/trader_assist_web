/** @format */

import { combineReducers } from 'redux';

import userRequestReducer from './auth/userRequestReducer';
import loginReducer from './auth/loginReducer';
import logoutReducer from './auth/logoutReducer';

import addInvestorReducer from './investor/addInvestorReducer';
import addInvestmentReducer from './investor/addInvestmentReducer';
import getInvestorsReducer from './investor/getInvestorsReducer';
import getInvestorInvestmentReducer from './investor/getInvestorInvestmentReducer';
import getInvestmentReturnsReducer from './investor/getInvestmentReturnsReducer';
import editInvestorReducer from './investor/editInvestorReducer';
import getInvestorReducer from './investor/getInvestorReducer';
import getInvestorHistoryReducer from './investor/getInvestorHistoryReducer';

import addBusinessReducer from './business/addBusinessReducer';
import getBusinessesReducer from './business/getBusinessesReducer';
import getBusinessOverviewReducer from './business/getBusinessOverviewReducer';
import businessMiscReducer from './business/businessMiscReducer';
import getBusinessHistoryReducer from './business/businessHistoryReducer';

import getInvestmentsReducer from './investment/getInvestmentsReducer';
import editInvestmentReducer from './investment/editInvestmentReducer';
import getInvestmentsByIdReducer from './investment/getInvestmentByIdReducer';

import getReturnsReducer from './returns/getReturnsReducer';
import getInvestorReturnsReducer from './investor/getInvestorReturnReducer';
import editReturnReducer from './returns/editReturnsReducer';
import getReturnsCalendarOverviewReducer from './returns/getReturnsCalendarOverviewReducer';

import confirmReturnReducer from './investor/confirmReturnReducer';
import registerReducer from './auth/registerReducer';

import inviteAdminStaffReducer from './settings/inviteAdminStaffReducer';
import getBusinessStaffReducer from './settings/getBusinessStaffs';

import imageUploadReducer from './misc/imageUploadReducer';
import cancelAdminStaffInviteReducer from './settings/cancelAdminStaffInviteReducer';
import getReturnsByIdReducer from './returns/getReturnByIdReducer';
import getBusinessReducer from './business/getBusinessReducer';

export default combineReducers({
  userRequest: userRequestReducer,
  login: loginReducer,
  register: registerReducer,
  logout: logoutReducer,

  addInvestor: addInvestorReducer,
  getInvestors: getInvestorsReducer,
  getInvestor: getInvestorReducer,
  addInvestment: addInvestmentReducer,
  getInvestorInvestment: getInvestorInvestmentReducer,
  getInvestmentReturns: getInvestmentReturnsReducer,
  editInvestor: editInvestorReducer,
  getInvestorHistory: getInvestorHistoryReducer,
  getInvestorReturns: getInvestorReturnsReducer,

  businessMisc: businessMiscReducer,
  addBusiness: addBusinessReducer,
  getBusiness: getBusinessReducer,
  getBusinesses: getBusinessesReducer,
  getBusinessOverview: getBusinessOverviewReducer,
  getBusinessHistory: getBusinessHistoryReducer,

  getInvestments: getInvestmentsReducer,
  editInvestment: editInvestmentReducer,
  getInvestmentsById: getInvestmentsByIdReducer,

  getReturns: getReturnsReducer,
  editReturn: editReturnReducer,
  confirmReturn: confirmReturnReducer,
  getReturnsById: getReturnsByIdReducer,
  getReturnsCalendarOverview: getReturnsCalendarOverviewReducer,

  inviteAdminStaff: inviteAdminStaffReducer,
  getBusinessStaff: getBusinessStaffReducer,
  cancelAdminStaffInvite: cancelAdminStaffInviteReducer,

  imageUpload: imageUploadReducer,
});
