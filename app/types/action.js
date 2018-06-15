// @flow
import type { Action as BlogListAction } from '../containers/BlogList/actionTypes';
import type { Action as LoginAction } from '../containers/Login/actionTypes';
import type { Action as MailAccountAction } from '../containers/MailAccount/actionTypes';
import type { Action as MailAddressListAction } from '../containers/MailAddressList/actionTypes';
import type { Action as PersonalInfoAction } from '../containers/PersonalInfo/actionTypes';
import type { Action as ProfileAction } from '../containers/Profile/actionTypes';
import type { Action as ResetPasswordAction } from '../containers/ResetPassword/actionTypes';

export type ReduxInitAction = {
  type: '@@INIT'
};

export type Action =
  | ReduxInitAction
  | BlogListAction
  | LoginAction
  | MailAccountAction
  | MailAddressListAction
  | PersonalInfoAction
  | ProfileAction
  | ResetPasswordAction;
