import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import CollapseList from '@/components/CollapseList';
import styles from './index.scss';

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
    isShowLiveList: false,
    isShowSportsSelect: false,
    liveSport: '所有比赛'
  };

  componentDidMount() {

  }

  showLiveList = () => {
    const { isShowLiveList } = this.state;
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
    window.frames.videoIFrame.location.href = url;
    this.setState({
      isShowLiveList: false
    })
  };

  toggleSportsSelect = () => {
    const { isShowSportsSelect } = this.state;
    this.setState({
      isShowSportsSelect: !isShowSportsSelect
    })
  };

  toggleLiveSport = (value) => {
    this.setState({
      liveSport: value,
      isShowSportsSelect: false
    })
  };

  render() {
    const { isShowSportsSelect, liveSport } = this.state;
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
        <div className={styles.liveBox}>
          <iframe
            title="videoIFrame"
            name="videoIFrame"
            width="100%"
            height="100%"
            src="https://player.youku.com/embed/XNDY0MDc0MTcwNA=="
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.liveList}>
          <div className={styles.title}>
            <span className={styles.name}>直播日程表 </span>
           {/* <span className={styles.close} onClick={this.closeLiveList}  /> */}
            <span className={styles.select} onClick={this.toggleSportsSelect}>{liveSport}
                  <Icon style={{ marginLeft: '4px' }} type="down"/></span>
            {
             isShowSportsSelect ?
               <div className={styles['select-list']}>
                 <div key="a" onClick={() => this.toggleLiveSport('所有球类')} className={styles.item}>所有球类</div>
                 <div key="b" onClick={() => this.toggleLiveSport('足球')} className={styles.item}>足球</div>
                 <div key="c" onClick={() => this.toggleLiveSport('足球')} className={styles.item}>足球</div>
                 <div key="d" onClick={() => this.toggleLiveSport('足球')} className={styles.item}>足球</div>
                 <div key="e" onClick={() => this.toggleLiveSport('足球')} className={styles.item}>足球</div>
                 <div key="f" onClick={() => this.toggleLiveSport('足球')} className={styles.item}>足球</div>
               </div>
               : null
            }
          </div>


          <div className={styles.list}>
            <CollapseList>
              <div className={styles.date}>世界杯</div>
              {
                liveURL.slice(0, 3).map((item) => (
                  <div
                    className={styles.item}
                    onClick={() => this.toggleLive(item.url)}
                  >
                    {item.name}
                    </div>
                ))
              }
            </CollapseList>
            <CollapseList>
              <div className={styles.date}>youtube</div>
              {
                liveURL.slice(3, 6).map((item) => (
                  <div
                    className={styles.item}
                    onClick={() => this.toggleLive(item.url)}
                  >
                    {item.name}
                  </div>
                ))
              }
            </CollapseList>
          </div>
        </div>
      </div>
    );
  }
}

export default MainLeft;
