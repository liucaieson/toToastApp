import React, { PureComponent } from 'react';
import styles from './index.scss';
import MainLeft from './MainLeft';
import MainRight from './MainRight';
import MainLive from './MainLive'

class Main extends PureComponent {

  state = {
    maxWidth: undefined,
  };

  timer = null;
  componentDidMount() {

  }

  componentWillUnmount() {

  }


  render() {
    return (
      <div className={styles['main-panel']}>
        <MainLeft />
        <MainRight />
        <MainLive />
      </div>
    );
  }
}

export default Main;
