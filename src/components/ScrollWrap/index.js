import React, { PureComponent } from 'react';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';

class ScrollWrap extends PureComponent {
  height = 0;

  componentDidMount() {
    const { wrapId, getRef, isX, isY,fn,isShowBar} = this.props;
    if (getRef) {
      getRef(this.myRef);
    }
    if(isShowBar){
      this.scroll = new BScroll(document.getElementById(wrapId), {
        click: true,
        scrollY: isY,
        scrollX: isX,
        mouseWheel: true,
        probeType:3,
        scrollbar: {
          fade: isShowBar,
          interactive: false
        }
      });
    }else{
      this.scroll = new BScroll(document.getElementById(wrapId), {
        click: true,
        scrollY: isY,
        scrollX: isX,
        mouseWheel: true,
        probeType:3,
      });
    }
   if(typeof fn === 'function') {
     this.scroll.on('scroll', fn);
     document.addEventListener('resize',
       this.scrollRefresh()
     )
   }
  }
  componentDidUpdate() {
    if(this.height !== this.myRef.clientHeight){
      this.height = this.myRef.clientHeight;
      this.scrollRefresh()
    }
  }
  componentWillUnmount() {
    document.removeEventListener('resize', this.scrollRefresh)
  }
  scrollRefresh =() => {
    this.scroll.refresh()
  };

  render() {
    const { children, wrapId, wrapClass, height, marginTop,width, wrapWidth} = this.props;
    return (
      <div
        style={{ overflow: 'hidden', height, marginTop,width,WebkitOverflowScrolling: 'touch' }}
        id={wrapId}
        className={wrapClass}
      >
        <div className="wrap" ref={ref => {
          this.myRef = ref;
        }} style={{width: wrapWidth}}>{children}</div>
      </div>
    );
  }
}

ScrollWrap.defaultProps = {
  children: null,
  wrapId: '',
  wrapClass: '',
  isX: false,
  isY: true,
  isShowBar: true
};

ScrollWrap.propTypes = {
  children: PropTypes.node,
  wrapId: PropTypes.string,
  wrapClass: PropTypes.string,
};

export default ScrollWrap;
