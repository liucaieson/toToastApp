import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './header2.scss'
import { Pagination } from 'antd';
import Loading from '@/components/MbPageLoading';

@connect(({ announcement, loading }) => ({
  announcement,
  loading: loading.models.announcement,
}))
class AnnouncementContent extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'announcement/fetch',
      payload: {
        sport: '1',
        page: 1,
        size: 5
      }
    });
  }

  handleTableChange = (page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'announcement/fetch',
      payload: {
        page,
        size: 5,
        sport: '1'
      }
    });
  };

  render() {
    const { announcement: { data: { data, count, current } }, loading } = this.props;
    return (
      <div className={styles.announcement}>
        {
          loading ? <Loading /> :
           data && data.map((val) => (
              <div key={val.messageId} className={styles.line}>
                <div className={styles.time}>{val.date}</div>
                <div className={styles.text}>{val.messageText}</div>
              </div>
            ))
        }
        <div className={styles['pagination-box']}>
          <Pagination
            total={count}
            current={current}
            pageSize={5}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

export default AnnouncementContent;
