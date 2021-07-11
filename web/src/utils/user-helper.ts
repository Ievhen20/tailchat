import type { UserLoginInfo } from 'pawchat-shared';

let _userLoginInfo: UserLoginInfo;

export function setGlobalUserLoginInfo(loginInfo: UserLoginInfo) {
  _userLoginInfo = loginInfo;
}

export function getGlobalUserLoginInfo() {
  return _userLoginInfo;
}
