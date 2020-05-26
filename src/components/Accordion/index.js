import React, { Component } from 'react';
import { Col, Icon, Row } from 'antd';
import styles from './index.scss';

export default class Accordion extends Component {
  state={
    isShow: true
  };

  toggleCpt = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow
    })
  };

  render() {
    const { cptName, children, style } = this.props;
    const { isShow } = this.state;

    return (
        <div>
          <Row className={styles['competitions-name']} style={style} onClick={() => this.toggleCpt()} >
            <Col span={1} className={styles.arrow}>
              {
                isShow ?
                  <div className={styles.arrow} >
                    <Icon type="down"/>
                  </div>
                  :
                  <div className={styles.arrow}>
                    <Icon type="up"/>
                  </div>
              }
            </Col>
            <Col span={20} className={styles.name}>
              {cptName}
            </Col>
          </Row>
          { isShow ? children : ''}
        </div>
    );
  }
}
