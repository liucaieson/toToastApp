import React, { Component } from 'react';
import styles from './index.scss';
import { Col, Icon, Row } from 'antd';

export default class Accordion  extends Component {

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
    const { cptName, children } = this.props;
    const { isShow } = this.state;

    return (
        <div>
          <Row className={styles['competitions-name']} onClick={() => this.toggleCpt()} >
            <Col span={1} className={styles.arrow}>
              {
                isShow ?
                  <div className={styles.arrow} >
                    <Icon type="down"/>
                  </div> :
                  <div className={styles.arrow}>
                    <Icon type="up"/>
                  </div>
              }
            </Col>
            <Col span={20} className={styles.name}>
              {cptName}
            </Col>
          </Row>
          { isShow ? children :''}
        </div>
    );
  }
}


