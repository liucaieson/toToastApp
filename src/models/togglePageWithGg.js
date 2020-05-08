// 根据gg选择页面
export default {
  namespace: 'togglePageWithGg',

  state: {
    pageId: '1',
    matchId: ''
  },

  effects: {
    *togglePage({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
    *turnToDetail({ payload }, { put }) {
      yield put({
        type: 'save2',
        payload,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        pageId: payload
      };
    },
    save2(state, { payload }) {
      return {
        ...state,
        pageId: payload.pageId,
        matchId: payload.matchId
      };
    },
  }
};
