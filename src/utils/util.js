import moment from 'moment';
import React from 'react';

moment.locale('zh-cn');

// 数组扁平化成list，不保存ids
export const normalizeData = (data, schema) => {
  const kvObj = {};
  const ids = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[schema]] = item;
      ids.push(item[schema]);
    });
  } else {
    kvObj[data[schema]] = data;
    ids.push(data[schema]);
  }
  return kvObj;
};

export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  // 获取url中"?"符后的字符串并正则匹配
  let context = '';
  if (r != null) { context = r[2] }
  return (context === null || context === '' || context === undefined) ? undefined : context;
};

/* 对数组排列组合 */
export const groupSplit = (arr, size) => {
  const r = []; // result

  function _(t, a, n) { // tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (let i = 0, l = a.length - n; i <= l; i++) {
      const b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }

  _([], arr, size);
  return r;
};

export const dishNameMap = {
  1: '主胜',
  11: '主主',
  '1X': '主和',
  12: '主客',
  2: '客胜',
  21: '客主',
  '2X': '客和',
  X2: '和客',
  X1: '和主',
  22: '客客',
  X: '和',
  XX: '和和',
  Over: '大',
  Under: '小',
  Exactly: '等',
  Home: '主',
  Away: '客',
  Even: '双',
  Odd: '单',
  '1-0': '1-0',
  '0-0': '0-0',
  '0-1': '0-1',
  '0-2': '0-2',
  '0-3': '0-3',
  '0-4': '0-4',
  '0-5': '0-5',
  '0-6': '0-6',
  '0-7': '0-7',
  '0-8': '0-8',
  '0-9': '0-9',
  '1-1': '1-1',
  '1-2': '1-2',
  '1-3': '1-3',
  '1-4': '1-4',
  '1-5': '1-5',
  '1-6': '1-6',
  '1-7': '1-7',
  '1-8': '1-8',
  '1-9': '1-9',
  '1-10': '1-10',
  '1-11': '1-11',
  '1-12': '1-12',
  '2-0': '2-0',
  '2-1': '2-1',
  '2-2': '2-2',
  '2-3': '2-3',
  '2-4': '2-4',
  '2-5': '2-5',
  '2-6': '2-6',
  '2-7': '2-7',
  '2-8': '2-8',
  '2-9': '2-9',
  '3-0': '3-0',
  '3-1': '3-1',
  '3-3': '3-3',
  '3-2': '3-2',
  '3-4': '3-4',
  '3-5': '3-5',
  '3-6': '3-6',
  '3-7': '3-7',
  '3-8': '3-8',
  '4-0': '4-0',
  '4-1': '4-1',
  '4-2': '4-2',
  '4-3': '4-3',
  '4-4': '4-4',
  '4-5': '4-5',
  '4-6': '4-6',
  '4-7': '4-7',
  '5-0': '5-0',
  '5-1': '5-1',
  '5-2': '5-2',
  '5-3': '5-3',
  '5-4': '5-4',
  '5-5': '5-5',
  '5-6': '5-6',
  '5-7': '5-7',
  '6-0': '6-0',
  '6-1': '6-1',
  '6-2': '6-2',
  '6-3': '6-3',
  '6-4': '6-4',
  '6-5': '6-5',
  '6-6': '6-6',
  '7-0': '7-0',
  '7-1': '7-1',
  '7-2': '7-2',
  '7-3': '7-3',
  '7-4': '7-4',
  '7-5': '7-5',
  '8-0': '8-0',
  '8-1': '8-1',
  '8-2': '8-2',
  '8-3': '8-3',
  '8-4': '8-4',
  '9-0': '9-0',
  '9-1': '9-1',
  '9-2': '9-2',
  '9-3': '9-3',
  '10-0': '10-0',
  '10-1': '10-1',
  '11-0': '11-0',
  '11-1': '11-1',
  '12-0': '12-0',
  '12-1': '12-1',
  '13-0': '13-0',
  '13-1': '13-1',
  '14-0': '14-0',
  '15-0': '15-0',
  '16-0': '16-0',
  '17-0': '17-0',
  '18-0': '18-0',
  '19-0': '19-0',
};

export const calcDate2 = (date) => {
  const time = moment(date).format('YYYY年MM月DD日  星期dd');
  const day = moment(date).format('HH:mm');
  return `${time} ${day}`;
};

export const formatUTCToLocal = (date) => {
  return moment(date).local().format('YYYY-MM-DD HH:mm:ss')
};

export const formatUTCToLocalWithoutYear = (date) => {
  return moment(date).local().format('MM-DD HH:mm:ss')
};

export const calcDateToMonthAndDay = (date) => {
  return moment(date).local().format('YYYY-MM-DD HH:mm')
};

export const dateList = () => {
  const timeList = [];
  let date1 = '';

  const weekMap = new Map();
  weekMap.set('星期一', '周一');
  weekMap.set('星期二', '周二');
  weekMap.set('星期三', '周三');
  weekMap.set('星期四', '周四');
  weekMap.set('星期五', '周五');
  weekMap.set('星期六', '周六');
  weekMap.set('星期日', '周日');

  for (let i = 1; i < 6; i += 1) {
    date1 = moment().add(i, 'day');
    const week = date1.format('dddd');
    const day = date1.format('DD MMMM');
    const name = `${day}(${weekMap.get(week)})`;
    timeList.push({
      name,
      value: date1.format(),
      isOver: 0
    })
  }

  return timeList
};

export const betTypeMap = {
  1: '',
  2: '二串一',
  3: '三串一',
  4: '四串一',
  5: '五串一',
  6: '六串一',
  7: '七串一',
  8: '八串一',
};
