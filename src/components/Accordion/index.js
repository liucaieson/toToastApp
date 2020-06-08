import React, { Component } from 'react';
import { Col, Icon, Row } from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './index.scss';

export default class Accordion extends Component {
  state = {
    isShow: true,
  };

  toggleCpt = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  };

  render() {
    const { cptName, children, style } = this.props;
    const { isShow } = this.state;

    return (
      <div>
        <Row className={styles['competitions-name']} style={style} onClick={() => this.toggleCpt()}>
          <Col span={1} className={styles.arrow}>
            {
              isShow ?
                <div className={styles.arrow}>
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
        <QueueAnim
          className={styles.content}
          type="bottom"
          appear={false}
           animConfig={[
          { opacity: [1, 0], translateY: [0, 0] },
          { opacity: [1, 0.1], translateY: [0, -50] }
        ]}>
          {isShow ?
            <div key="1">
              {children}
            </div>
            :
            null
          }
        </QueueAnim>
      </div>
    );
  }
}
