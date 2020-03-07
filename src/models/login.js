// 登录
import { loginApp } from '@/services/api';

export default {
  namespace: 'login',

  state: {
    isLogin:false,
    token: {
    },
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      let data = yield call(loginApp, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data);
    },
    /*改变登录状态*/
    *changeLoginStatus({ payload }, { call, put }) {
      const { isLogin } = payload;
      yield put({
        type: 'change',
        payload: isLogin,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        token: payload,
      };
    },
    change(state, { payload }) {
      return {
        ...state,
        isLogin: payload,
      };
    },
  },
};
