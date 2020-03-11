/* 根据gg选择页面 */
export default {
  namespace: 'togglePageWithGg',

  state: {
    pageId: '1',
    matchId: ''
  },

  effects: {
    *togglePage({payload}, { call, put, select }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },
    *turnToDetail({payload}, { call, put, select }) {
      yield put({
        type: 'save2',
        payload: payload,
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
