// 获取用户信息
import { getUserInfo } from '@/services/api';

export default {
  namespace: 'userInfo',

  state: {
    userName: '',
    balance: '',
    userId: ''
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(getUserInfo, payload);

      yield put({
        type: 'save',
        payload: data,
      });
    },

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        userName: payload.userName,
        balance: payload.balance,
        userId: payload.userId
      };
    },
  },

  /* subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  }, */
};
