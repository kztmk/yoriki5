// @flow
import type Saga from 'redux-saga';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  clearAuthInfo,
  loginDoneSuccess,
  loginDoneFailure,
  loginDoneRequest
} from './actions';
import { Actions } from './actionTypes';
import type { AuthType } from '../../types/auth';
import { firebaseSignInWithEmailAndPassword, firebaseSignOut } from '../../database/db';

/**
 * firebae error.codeからerror内容を日本語化する
 * @param error
 * @returns 日本語に翻訳したエラーメッセージ
 */
function getErrorMessage(error): string {
  if (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return '有効なメールアドレスではありません。';
      case 'anth/user-disabled':
        return '有効なユーザーではありません。';
      case 'auth/wrong-password':
        return 'パスワードが一致しません。';
      case 'auth/user-not-found':
        return 'このメールアドレスでのユーザーは見つかりません。';
      default:
        return error.message;
    }
  } else {
    return '';
  }
}

/**
 *   firebaseからログアウトする
 *
 *   firebase API signOutを呼び、logoutSuccessアクションをdispatch
 *   errorの場合は、logoutFailureアクションをdispatch.
 *
 *   firebase API signOUtは、voidを返すので完了を待たない。
 */
function* requestLogout() {
  try {
    yield call(firebaseSignOut);
    yield put(logoutSuccess());
    yield put(clearAuthInfo());
  } catch (err) {
    const authInfo: AuthType = yield select(state => state.Login);
    yield put(logoutFailure({ ...authInfo, errorMessage: err }));
  }
}

/**
 *   1. loginRequestアクションをdispatch(ローディングをONにする)、
 *   2. firebase API signInWithEmailAndPasswordを実行
 *        success=> loginSuccessをdispatch
 *        error=>loginFailureをdispatch
 */
function* requestLogin() {
  yield put(loginRequest());
  const authInfo: AuthType = yield select(state => state.Login);

  try {
    const user = yield call(firebaseSignInWithEmailAndPassword, {
      email: authInfo.mailAddress,
      password: authInfo.password
    });
    console.log('user:');
    console.log(user);

    yield put(loginSuccess({ ...authInfo, userId: user.user.uid }));
    yield put(loginDoneRequest());
  } catch (error) {
    yield put(loginFailure({ ...authInfo, errorMessage: getErrorMessage(error) }));
  }
}

function* loginDone() {
  try {
    yield put(loginDoneSuccess());
  } catch (error) {
    yield put(loginDoneFailure(error.toString()));
  }
}

/**
 *  login SetAuthInfoアクションを待機
 *  logout logoutRequestアクションを待機
 */
function* rootSaga(): Saga {
  yield takeEvery(Actions.LOGIN_DONE_REQUEST, loginDone);
  yield takeEvery(Actions.SET_AUTH_INFO, requestLogin);
  yield takeEvery(Actions.LOGOUT_REQUEST, requestLogout);
}

export default rootSaga;
