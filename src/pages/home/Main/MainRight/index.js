import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CommandMatch from './CommandMatch';
import PointSpread from './AsianDish/PointSpread/PointSpread';
import TotalOver from './AsianDish/TotalOver/TotalOver';
import TotalResult from './AsianDish/TotalResult/TotalResult';
import Double from './AsianDish/Double';
import CorrectScore from './AsianDish/CorrectScore';
import DoubleResult from './AsianDish/DoubleResult';
import FirstGoal from './AsianDish/FirstGoal';
import Mixed from './AsianDish/Mixed';
import TodayPointSpread from './TodayDish/PointSpread/PointSpread';
import TodayTotalOver from './TodayDish/TotalOver/TotalOver';
import TodayTotalResult from './TodayDish/TotalResult/TotalResult';
import TodayDouble from './TodayDish/Double';
import TodayCorrectScore from './TodayDish/CorrectScore';
import TodayDoubleResult from './TodayDish/DoubleResult';
import TodayFirstGoal from './TodayDish/FirstGoal';
import TodayMixed from './TodayDish/Mixed';
import InPlayMatch from './InplayMatch';
import InPlayFav from './InplayMatch/favorite';
import styles from './index.scss';

@connect(({ togglePageWithGg }) => ({
  togglePageWithGg
}))
class MainRight extends PureComponent {
  state = {

  };
  timer = null;
  componentDidMount() {

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderPage(){
    const {
      togglePageWithGg: { pageId , matchId },
    } = this.props;
    if(pageId === 'command'){
      return  <CommandMatch />
    }
    if(pageId === '1'){
      return  <PointSpread />
    }
    if(pageId === '2'){
      return  <TotalResult />
    }
    if(pageId === '3'){
      return  <TotalOver />
    }
    if(pageId === '4'){
      return  <Double />
    }
    if(pageId === '5'){
      return  <CorrectScore />
    }
    if(pageId === '6'){
      return  <DoubleResult />
    }
    if(pageId === '7'){
      return  <FirstGoal />
    }
    if(pageId === '8'){
      return  <Mixed />
    }
    if(pageId === 't1'){
      return  <TodayPointSpread />
    }
    if(pageId === 't2'){
      return  <TodayTotalResult />
    }
    if(pageId === 't3'){
      return  <TodayTotalOver />
    }
    if(pageId === 't4'){
      return  <TodayDouble />
    }
    if(pageId === 't5'){
      return  <TodayCorrectScore />
    }
    if(pageId === 't6'){
      return  <TodayDoubleResult />
    }
    if(pageId === 't7'){
      return  <TodayFirstGoal />
    }
    if(pageId === 't8'){
      return  <TodayMixed />
    }
    if(pageId === 'inPlay'){
      return  <InPlayMatch />
    }
  /*  if(pageId === 'detail'){
      return  <MatchDetail matchId={matchId} />
    }
    if(pageId === 'mixedDetail'){
      return  <MixedMatchDetail matchId={matchId} />
    }*/
    if(pageId === 'inPlayFav'){
      return  <InPlayFav />
    }
  }

  render() {
    return (
      <div className={styles['main-right-box']} id='mainRightBox'>
        {this.renderPage()}
      </div>

    );
  }
}

export default MainRight;
