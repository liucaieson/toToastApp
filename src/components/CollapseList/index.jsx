import React from 'react';
import Animate from 'rc-animate';
import velocity from 'velocity-animate';
import styles from './index.scss';

const Box = props => {
  const style = {
    width: '100%',
    display: props.visible ? 'block' : 'none',
    ...props.contentStyles,
  };
  return (<div style={style}>{
    props.children
  }</div>);
};

class Accordion extends React.PureComponent {
  state = {
    visible: true,
    exclusive: false,
  };

  constructor(props){
    super(props);
    const { defaultShow } = this.props;
    if (defaultShow === false) {
     this.state = defaultShow
    }
  }

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

  toggleAnimate = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  render() {
    const { visible, exclusive } = this.state;
    const { titleStyle, contentStyles } = this.props;
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    };

    return (
      <div>
        <div className={styles.title} style={titleStyle} onClick={this.toggleAnimate}>
          {this.props.children[0]}
        </div>
        <div className={styles.content}>
          <Animate
            component=""
            exclusive={exclusive}
            showProp="visible"
            animation={anim}
          >
            <Box visible={visible} contentStyles={contentStyles}>
              {this.props.children[1]}
            </Box>
          </Animate>
        </div>
      </div>
    );
  }
}

export default Accordion;
