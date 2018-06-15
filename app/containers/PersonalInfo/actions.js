// @flow
import PersonalInfoType from '../../types/personalInfo';

import {
  GET_PERSONAL_INFO_REQUEST,
  GET_PERSONAL_INFO_SUCCESS,
  GET_PERSONAL_INFO_FAILURE,
  GET_RANDOM_PERSONAL_INFO_REQUEST,
  GET_RANDOM_PERSONAL_INFO_SUCCESS,
  GET_RANDOM_PERSONAL_INFO_FAILURE,
  SAVE_PERSONAL_INFO_REQUEST,
  SAVE_PERSONAL_INFO_SUCCESS,
  SAVE_PERSONAL_INFO_FAILURE
} from './actionTypes';
import type {
  GetPersonalInfoRequest,
  GetPersonalInfoSuccess,
  GetPersonalInfoFailure,
  GetRandomPersonalInfoRequest,
  GetRandomPersonalInfoSuccess,
  GetRandomPersonalInfoFailure,
  SavePersonalInfoRequest,
  SavePersonalInfoSuccess,
  SavePersonalInfoFailure
} from './actionTypes';

export function getPersonalInfoRequest(): GetPersonalInfoRequest {
  return {
    type: GET_PERSONAL_INFO_REQUEST
  };
}
export function getPersonalInfoSuccess(payload: PersonalInfoType): GetPersonalInfoSuccess {
  return {
    type: GET_PERSONAL_INFO_SUCCESS,
    payload
  };
}
export function getPersonalInfoFailure(meta: { errorMessage: string }): GetPersonalInfoFailure {
  return {
    type: GET_PERSONAL_INFO_FAILURE,
    meta
  };
}
export function getRandomPersonalInfoRequest(): GetRandomPersonalInfoRequest {
  return {
    type: GET_RANDOM_PERSONAL_INFO_REQUEST
  };
}
export function getRandomPersonalInfoSuccess(
  payload: PersonalInfoType
): GetRandomPersonalInfoSuccess {
  return {
    type: GET_RANDOM_PERSONAL_INFO_SUCCESS,
    payload
  };
}
export function getRandomPersonalInfoFailure(meta: {
  errorMessage: string
}): GetRandomPersonalInfoFailure {
  return {
    type: GET_RANDOM_PERSONAL_INFO_FAILURE,
    meta
  };
}
export function savePersonalInfoRequest(payload: PersonalInfoType): SavePersonalInfoRequest {
  return {
    type: SAVE_PERSONAL_INFO_REQUEST,
    payload
  };
}
export function savePersonalInfoSuccess(payload: PersonalInfoType): SavePersonalInfoSuccess {
  return {
    type: SAVE_PERSONAL_INFO_SUCCESS,
    payload
  };
}
export function savePersonalInfoFailure(meta: { errorMessage: string }): SavePersonalInfoFailure {
  return {
    type: SAVE_PERSONAL_INFO_FAILURE,
    meta
  };
}
