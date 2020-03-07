/* 全局修改购物车的显示隐藏 */
export default {
  namespace: 'changeBetSectionStatus',

  state: {
    betSectionStatus: false,
    tabsStatus: 'bets'
  },

  effects: {
    *changeStatus({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },

  },

  reducers: {
    save(state, { payload }) {
      if(payload[1]){
        return {
          ...state,
          betSectionStatus: payload[0],
          tabsStatus: payload[1]
        }
      }
      return {
        ...state,
        betSectionStatus: payload[0],
      };
    },

  },
};
