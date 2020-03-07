import React, { PureComponent } from 'react';
import styles from './index.scss';
import MainLeft from './MainLeft/index';
import MainRight from './MainRight';
import withErrorHandler from '../../../components/ErrorHandler'

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
      </div>
    );
  }
}

export default Main;
