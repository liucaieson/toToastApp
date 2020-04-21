import React, { PureComponent } from 'react';
import styles from './index.scss';
import { Icon } from 'antd';
import CollaspeList from '../../../../components/CollapseList'

const liveURL = [
  {
    name: '上帝之手，86年世界杯马拉多纳VS英格兰',
    url: 'https://player.youku.com/embed/XNDY0MDc0MTcwNA=='
  },
  {
    name: '德国7:1巴西',
    url: 'https://player.youku.com/embed/XNDUxMzU0ODg2OA=='
  },
  {
    name: '2014年世界杯半决赛德国VS阿根廷',
    url: 'https://player.youku.com/embed/XMTczMzk0ODQ3Mg=='
  },
  {
   name: '2014年世界杯精选',
   url: 'https://www.youtube.com/embed/5hFZu6X5drw'
  },
  {
    name: '2018年世界杯精选',
    url: 'https://www.youtube.com/embed/Gu0k6IwmjDM'
  },
];


class MainLeft extends PureComponent {

  state = {
    isShowLiveList: false
  };

  componentDidMount() {

  }

  showLiveList = () => {
    const { isShowLiveList} = this.state;
    this.setState({
      isShowLiveList: !isShowLiveList
    })
  };

  closeLiveList = () => {
    this.setState({
      isShowLiveList: false
    })
  };

  toggleLive = (url) => {
    window.frames['videoIFrame'].location.href = url;
    this.setState({
      isShowLiveList: false
    })
  };

  render() {
    const { isShowLiveList } = this.state;
    return (
      <div className={styles['main-live-box']}>
        <div className={styles.header}>
          <div className={styles.left}>
             <i className={styles.icon} /> <span className={styles.name}>观看现场</span>
          </div>
          <div className={styles.right}>
            <div className={styles.name} onClick={this.showLiveList}>
              直播表
            </div>
          </div>
        </div>
      {/*  {
          isShowLiveList ?
            <div className={styles.liveList}>
              <div className={styles.title}>
                <span className={styles.name}>直播日程表 </span>
                <span className={styles.close} onClick={this.closeLiveList}  />
                <span className={styles.select}>所有球类
                  <Icon style={{marginLeft : '4px'}} type='down'/></span>
              </div>
              <div className={styles.list}>
                <div className={styles.date}>2018</div>
                {
                  liveURL.map((item) => (
                    <div className={styles.item} onClick={() => this.toggleLive(item.url)}>{item.name}</div>
                  ))
                }
              </div>
            </div>
            : ''
        }*/}
        <div className={styles.liveBox}>
          <iframe name='videoIFrame'  width="100%" height="100%" src="https://player.youku.com/embed/XNDY0MDc0MTcwNA==" frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
        </div>
        <div className={styles.liveList}>
          <div className={styles.title}>
            <span className={styles.name}>直播日程表 </span>
           {/* <span className={styles.close} onClick={this.closeLiveList}  />*/}
            <span className={styles.select}>所有球类
                  <Icon style={{marginLeft : '4px'}} type='down'/></span>
          </div>
          <div className={styles.list}>
            <CollaspeList>
              <div className={styles.date}>世界杯</div>
              {
                liveURL.slice(0,3).map((item) => (
                  <div className={styles.item} onClick={() => this.toggleLive(item.url)}>{item.name}</div>
                ))
              }
            </CollaspeList>
            <CollaspeList>
              <div className={styles.date}>youtube</div>
              {
                liveURL.slice(3,6).map((item) => (
                  <div className={styles.item} onClick={() => this.toggleLive(item.url)}>{item.name}</div>
                ))
              }
            </CollaspeList>
          </div>
        </div>
      </div>
    );
  }
}

export default MainLeft;
