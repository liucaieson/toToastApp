import React, { Component } from 'react';
import styles from './index.scss';
import { Icon } from 'antd-mobile';

export default class Accordion extends Component {

  state = {
    isShow: true,
  };

  componentDidMount(){
    const { defaultShow } = this.props;
    if(defaultShow){
      this.setState({
        isShow: defaultShow
      })
    }
  }

  toggle = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  };

  render() {
    const { isShow } = this.state;
    const { titleStyle} = this.props;

    return (
      <div>
        <div className={styles.title} style={titleStyle} onClick={this.toggle}>
          {this.props.children[0]}
        </div>
        <div className={styles.content}>
          {isShow ? this.props.children[1] : ''}
        </div>
      </div>
    );
  }
}


