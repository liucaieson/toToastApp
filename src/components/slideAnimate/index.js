/*
 * @Author: Jan-superman
 * @Date: 2018-09-27 20:38:14
 * @Last Modified by: superman
 * @Last Modified time: 2019-02-01 16:58:15
 */

import React, { PureComponent } from 'react';

import { CSSTransition } from 'react-transition-group';
import './index.less';

export default class BasicLayout extends PureComponent {
  render() {
   const { children, come, clsName } = this.props;
    return (
        <CSSTransition in={come} classNames={clsName} timeout={300}>
          {children}
        </CSSTransition>
    );
  }
}
