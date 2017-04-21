import { createTypes, async } from 'redux-action-types';

export default createTypes('auth/',
  async('REFRESH_TOKEN'),
  async('FORGET_PASSWORD'),
  async('RESET_PASSWORD'),
  async('LOGIN'),
  async('LOGOUT'),
  async('SIGNUP'),
    'TOKEN_REFRESHING',
    'TOKEN_REFRESHING_FAILED',
  'LOGIN_SUCCESS_DATA',
  'RESET_PASSWORD_DATA',
  'CLEAR_RESET_PASSWORD_DATA',
    'NEED_REDIRECT',
    'REMOVE_REDIRECT',
    'STORE_AFTER_LOGIN_URL'
)
