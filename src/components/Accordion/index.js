import React, { Component } from 'react';
import { Col, Icon, Row } from 'antd';
import Animate from 'rc-animate';
import velocity from 'velocity-animate';
import styles from './index.scss';

const Box = props => {
  const style = {
    width: '100%',
    display: props.visible ? 'block' : 'none',
  };
  return (<div style={style}>{
    props.children
  }
  </div>);
};

export default class Accordion extends Component {
  state = {
    visible: true,
    exclusive: false,
  };

  toggleAnimate = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  animateEnter = (node, done) => {
    let ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    node.style.display = 'none';
    velocity(node, 'slideDown', {
      duration: 300,
      complete,
    });
    return {
      stop() {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      },
    };
  };

  animateLeave = (node, done) => {

    let ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    node.style.display = 'block';

    velocity(node, 'slideUp', {
      duration: 300,
      complete,
    });
    return {
      stop() {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      },
    };
  };

  render() {
    const { cptName, children, style } = this.props;
    const { visible, exclusive } = this.state;
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    };

    return (
      <div>
        <Row className={styles['competitions-name']} style={style} onClick={this.toggleAnimate}>
          <Col span={1} className={styles.arrow}>
            {
              visible ?
                <div className={styles.arrow}>
                  <Icon type="down"/>
                </div>
                : <div className={styles.arrow}>
                  <Icon type="up"/>
                </div>
            }
          </Col>
          <Col span={20} className={styles.name}>
            {cptName}
          </Col>
        </Row>
        <Animate
          component=""
          exclusive={exclusive}
          showProp="visible"
          animation={anim}
        >
          <Box visible={this.state.visible}>
            {children}
          </Box>
        </Animate>
      </div>
    );
  }
}
