import React from 'react';
import styles from './index.scss';
import MainLeft from './MainLeft';
import MainRight from './MainRight';
import MainLive from './MainLive'

export default () => (
  <div className={styles['main-panel']}>
    <MainLeft />
    <MainRight />
    <MainLive />
  </div>
)
