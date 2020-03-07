/*
 * @Author: Jan-superman
 * @Date: 2018-09-27 20:38:14
 * @Last Modified by: superman
 * @Last Modified time: 2019-02-01 16:58:15
 */

import React, { PureComponent } from 'react';

import { TransitionGroup, CSSTransition,Transition } from "react-transition-group";


class Fade extends    PureComponent {

  done =() => {

  };
  addaddEndListener = (node) => { //原生时间transition运动的事件
    node.addEventListener('transitionend', this.done, false);
  };

  // 三个进入状态的事件，可以做你想做的事情
  onEnter = (node, isAppearing) => {

  };
  onEntering = (node, isAppearing) => {

  };
  onEntered = (node, isAppearing) => {

  };

  // 三个退出的状态的事件
  onExit = (node) => {

  };
  onExiting = () => {

  };
  onExited = () => {
    this.props.self()
  };
  render() {
    const { in: inProp, } = this.props;
    const defaultStyle = {
      transition: `transform ${300}ms ease-in-out, opacity ${300}ms ease-in-out`,
      transform: 'translateX(100px)',
      opacity: '0'
    };

    const transitionStyles = {
      entering: { transform: 'translateY(10px)', opacity: '0'},
      entered:  { transform: 'translateY(0px)', opacity: '1' },
      exiting: {transform: 'translateY(0px)', opacity: '1'},
      exited: {transform: 'translateY(0px)', opacity: '0'}
    };
    const duration = {
      enter: 100,
      exit: 200,
    };
    // 上面的都是基本参数，样式的转变以及时间的设定，具体的可以看官网文档
    // 样式也可以写成className 例如<MyComponent className={`fade fade-${status}`} />
    return (
      <Transition
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}

        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}

        addEndListener={this.addaddEndListener}
        in={inProp}
        unmountOnExit={false} // 为true 代表退出的时候移除dom
        appear={true} // 为true  渲染的时候就直接执行动画，默认false，
        timeout={duration}
      >
        {
          state => {//你可以很直观的看到组件加载和卸载时候的状态
            return(
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                {this.props.children}
              </div>
            )
          }
        }
      </Transition>
    );
  }
}

export default Fade
