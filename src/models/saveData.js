// 集中保存比赛数据，盘口数据，和竟猜项数据
export default {
  namespace: 'saveData',

  state: {},

  effects: {
    *saveData({ payload, callback }, { put, select }) {
      const chsListObj = {};
      if (Array.isArray(payload)) {
        payload.forEach(item => {
          item.odds.forEach(val => {
            val.chs.forEach(v => {
              chsListObj[v.choiceId] = v;
            })
          })
        })
      }

      /* 储存以choiceId为key的盘口竟猜项数据 */
      const chsDB = yield select(state => state.chsDB.chsDB);

      const newChsDB = {
        ...chsDB,
        ...chsListObj
      };

      yield put({
        type: 'chsDB/saveChsData',
        payload: newChsDB,
      });
      if (callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        competitionsMatchList: payload
      };
    },
  },
};
