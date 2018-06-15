// @flow
import { combineReducers } from 'redux';
import BlogList from './containers/BlogList/reducer';
import Login from './containers/Login/reducer';
import MailAccount from './containers/MailAccount/reducer';
import MailAddressList from './containers/MailAddressList/reducer';
import PersonalInfo from './containers/PersonalInfo/reducer';
import Profile from './containers/Profile/reducer';
import ResetPassword from './containers/ResetPassword/reducer';

export default combineReducers({
  BlogList,
  Login,
  MailAccount,
  MailAddressList,
  PersonalInfo,
  Profile,
  ResetPassword
});
