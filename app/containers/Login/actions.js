// @flow
import type { AuthType } from '../../types/auth';

import {
  SET_AUTH_INFO,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_DONE_REQUEST,
  LOGIN_DONE_SUCCESS,
  LOGIN_DONE_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_AUTH_INFO,
  UPDATE_AUTH_INFO
} from './actionTypes';
import type {
  SetAuthInfo,
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  LoginDoneRequest,
  LoginDoneSuccess,
  LoginDoneFailure,
  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,
  ClearAuthInfo,
  UpdateAuthInfo
} from './actionTypes';

export function setAuthInfo(payload: AuthType): SetAuthInfo {
  return {
    type: SET_AUTH_INFO,
    payload
  };
}
export function loginRequest(): LoginRequest {
  return {
    type: LOGIN_REQUEST
  };
}
export function loginSuccess(payload: AuthType): LoginSuccess {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
}
export function loginFailure(payload: AuthType): LoginFailure {
  return {
    type: LOGIN_FAILURE,
    payload
  };
}
export function loginDoneRequest(): LoginDoneRequest {
  return {
    type: LOGIN_DONE_REQUEST
  };
}
export function loginDoneSuccess(): LoginDoneSuccess {
  return {
    type: LOGIN_DONE_SUCCESS
  };
}
export function loginDoneFailure(meta: { errorMessage: string }): LoginDoneFailure {
  return {
    type: LOGIN_DONE_FAILURE,
    meta
  };
}
export function logoutRequest(): LogoutRequest {
  return {
    type: LOGOUT_REQUEST
  };
}
export function logoutSuccess(): LogoutSuccess {
  return {
    type: LOGOUT_SUCCESS
  };
}
export function logoutFailure(payload: AuthType): LogoutFailure {
  return {
    type: LOGOUT_FAILURE,
    payload
  };
}
export function clearAuthInfo(): ClearAuthInfo {
  return {
    type: CLEAR_AUTH_INFO
  };
}
export function updateAuthInfo(payload: AuthType): UpdateAuthInfo {
  return {
    type: UPDATE_AUTH_INFO,
    payload
  };
}
