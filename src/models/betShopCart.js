/* 购物车逻辑 */
import { message, Modal } from 'antd';
import { addShopCart, postBetOrder } from '@/services/api';

export default {
  namespace: 'betShopCart',
  // 购物车数据ids为盘口项的choiceId，list为以盘口项为key的obj。
  state: {
    shopCart: {
      ids: [],
      list: {},
    },
    // 混合过关的购物车数据ids为比赛的id，list为以比赛为key的obj。
    mixedShopCart: {
      ids: [],
      list: [],
    },
  },

  effects: {
    // 提交购物车投注单
    *postBetOrder({ payload, callback }, { call, put, select }) {
      const data = yield call(postBetOrder, payload);
      const shopCartData = yield select(state => state.betShopCart.shopCart);
      /* 200为投注成功 */
      if (data.code === 200) {
        // 更新赔率
        const chsListObj = {};
        const chsDB = yield select(state => state.chsDB.chsDB);
        const ids = [];
        const list = {};
        data.data.forEach((val) => {
          // 不等于208标识错误交给购物车,并更新赔率
          if (val.code !== '208') {
            chsListObj[val.choiceId] = val;
            ids.push(val.choiceId);
            list[val.choiceId] = {
              ...shopCartData.list[val.choiceId],
              ...val,
            };
          }
        });
        const newChsDB = {
          ...chsDB,
          ...chsListObj,
        };
        yield put({
          type: 'chsDB/saveChsData',
          payload: newChsDB,
        });
        yield put({
          type: 'save',
          payload: {
            ids,
            list,
          },
        });
        // 将返回的数据给视图层处理
        if (callback) callback(data.data);
      } else if (data.code === 3002) {
        Modal.info({
          title: '提示',
          content: '余额不足',
        });
      } else {
        Modal.info({
          title: '提示',
          content: data.message,
        });
      }
    },
    /* 提交购物车投注单 */
    *postMixedOrder({ payload, callback }, { call, put, select }) {
      const data = yield call(postBetOrder, payload);
      const shopCartData = yield select(state => state.betShopCart.mixedShopCart);
      /* 200为投注成功 */
      if (data.code === 200) {
        const chsListObj = {};
        const chsDB = yield select(state => state.chsDB.chsDB);
        const { ids, list } = shopCartData;
        // 判断错误数量===0 则下注成功
        let err = 0;
        data.data.forEach((val) => {
          // 不等于208标识错误交给购物车,并更新赔率
          if (val.code !== '208') {
            err += 1;
            chsListObj[val.matchId] = val;
            list[val.matchId] = {
              ...list[val.matchId],
              ...val,
            };
          }
        });
        const newChsDB = {
          ...chsDB,
          ...chsListObj,
        };
        yield put({
          type: 'chsDB/saveChsData',
          payload: newChsDB,
        });
        if (err === 0) {
          yield put({
            type: 'saveMixed',
            payload: {
              ids: [],
              list: {},
            },
          });
        } else {
          yield put({
            type: 'saveMixed',
            payload: {
              ids,
              list,
            },
          });
        }
        /* 将返回的数据给视图层处理 */
        if (callback) callback(data.data);
      } else if (data.code === 3002) {
        Modal.info({
          title: '提示',
          content: '余额不足',
        });
      } else {
        Modal.info({
          title: '提示',
          content: data.message,
        });
      }
    },
    /* 添加盘口项到购物车，购物车数据ids为盘口竞猜项的ids，list为以盘口竞猜项为key的obj。
     * 如果ids没有该盘口直接添加到购物车
     * 如果ids有该盘口，说明是一个盘口替换其中的盘口项
      * */
    *addBetShopCart({ payload, callback }, { call, put, select }) {
      const cartData = yield select(state => state.betShopCart.shopCart);
      if (cartData.ids.length > 10) {
        message.info('购物车满了。。。请投注');
        return;
      }
      cartData.ids.push(payload.choiceId);
      cartData.list[payload.choiceId] = {
        dish: 1,
        amount: 0,
      };
      yield put({
        type: 'save',
        payload: cartData,
      });

      const data = yield call(addShopCart, {
        dishId: payload.dishId,
        sport: payload.sport,
        status: payload.status,
      });
      // 如果数据错误就返回清除预先加入的错误投注
      if (data[0] === undefined) {
        yield put({
          type: 'betShopCart/delBetShopCart',
          payload: payload.choiceId,
        });
        message.info(data.message || '该投注暂时不能加入投注单');
        return;
      }
      // 进入正常处理流程，加入注单
      const betCartData = yield select(state => state.betShopCart.shopCart);
      const firstIds = data[0].choiceId;
      const firstInfo = data[0];
      /* 判断购物车是否有商品 */
      if (!betCartData.ids.includes(firstIds)) {
        betCartData.ids.push(firstIds);
        betCartData.list[firstIds] = {
          ...betCartData.list[firstIds],
          ...firstInfo,
          amount: 0,
        };
      } else {
        betCartData.list[firstIds] = {
          ...betCartData.list[firstIds],
          ...firstInfo,
        };
      }
      /* 储存以choiceId为key的盘口竟猜项数据 */
      const chsDB = yield select(state => state.chsDB.chsDB);
      const newChsDB = {
        ...chsDB,
        [data.choiceId]: data,
      };
      yield put({
        type: 'chsDB/saveChsData',
        payload: newChsDB,
      });

      yield put({
        type: 'save',
        payload: betCartData,
      });

      if (callback) callback();
    },
    /* 添加混合过关到购物车
    *  购物车数据ids为这场比赛的id，list为以比赛id为key的obj。
    * */
    *addMixedShopCart({ payload, callback }, { call, put, select }) {
      const data = yield call(addShopCart, payload);
      // 如果数据错误就返回清除预先加入的错误投注
      if (data[0] === undefined) {
        message.info(data.message || '该投注暂时不能加入投注单');
        return;
      }
      const firstIds = data[0].matchId;
      const firstInfo = data[0];
      const shopCartData = yield select(state => state.betShopCart.mixedShopCart);
      if (shopCartData.ids.length === 8 && !shopCartData.ids.includes(firstIds)) {
        message.info('最多选择8场');
        return;
      }
      // 判断ids里面是否含有比赛的id，没有就加入购物车，有就进行替换
      if (!shopCartData.ids.includes(firstIds)) {
        shopCartData.ids.push(firstIds);
        shopCartData.list[firstIds] = {
          ...firstInfo,
        };
      } else {
        shopCartData.list[firstIds] = {
          ...shopCartData.list[firstIds],
          matchId: firstInfo.matchId,
          gamblingId: firstInfo.gamblingId,
          choiceId: firstInfo.choiceId,
          oddName: firstInfo.oddName,
          choiceHandicap: firstInfo.choiceHandicap,
          dish: firstInfo.dish,
          name: firstInfo.name,
          code: firstInfo.code,
        };
      }
      yield put({
        type: 'saveMixed',
        payload: shopCartData,
      });
      if (callback) callback();
    },
    /* 删除购物车的其中一项 删除过程中应该清除盘口列表中的高亮效果，这个写在了views层调用的函数中 */
    *delBetShopCart({ payload }, { put, select }) {
      const data = yield select(state => state.betShopCart.shopCart);
      const index = data.ids.indexOf(payload);
      if (index > -1) {
        delete data.list[payload];
        data.ids.splice(index, 1);
      }
      yield put({
        type: 'save',
        payload: data,
      });
    },
    /* 删除混合过关购物车的其中一项 删除过程中应该清除盘口列表中的高亮效果 */
    *delMixedShopCart({ payload }, { put, select }) {
      const data = yield select(state => state.betShopCart.mixedShopCart);
      const index = data.ids.indexOf(payload);
      if (index > -1) {
        delete data.list[payload];
        data.ids.splice(index, 1);
      }
      yield put({
        type: 'saveMixed',
        payload: data,
      });
    },
    /* 删除所有混合过关购物车， 删除过程中应该清除盘口列表中的高亮效果 */
    *delAllMixedShopCart(_, { put }) {
      yield put({
        type: 'saveMixed',
        payload: {
          ids: [],
          list: {},
        },
      });
    },
    /* 修改投注金额,只有单注有 */
    *addShopCartItemAmount({ payload }, { put, select }) {
      const data = yield select(state => state.betShopCart.shopCart);
      data.list[payload.id].amount = payload.amount;
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
        shopCart: payload,
      };
    },
    saveMixed(state, { payload }) {
      return {
        ...state,
        mixedShopCart: payload,
      };
    },
  },
};
