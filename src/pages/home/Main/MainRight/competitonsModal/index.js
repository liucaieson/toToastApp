import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox, Modal, Row, Form, Icon } from 'antd';
import styles from './index.scss';
import Collapse from './collapse';

@connect(({ showCompetitions, area, competitions }) => ({
  showCompetitions,
  area,
  competitions,
}))
class CompetitionsModal extends Component {
  state = {
    competitions: [],
    indeterminate: true,
    checkAll: false,
  };

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch({
      type: 'competitions/fetchModalList',
      payload: {
        ...params,
      },
    });
  }

  onCheck = () => {
    const { fn } = this.props;
    if (this.props.form.getFieldsValue().competitions === undefined) {
      this.closeShowCompetitionsModal();
    } else {
      const params = this.props.form.getFieldsValue().competitions.join(',');
      fn(params);
      this.closeShowCompetitionsModal();
    }
  };

  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'showCompetitions/toggle',
      payload: false,
    });
  };

  closeShowCompetitionsModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'showCompetitions/toggle',
      payload: false,
    });
  };

  onChange = checkedList => {
    this.props.form.setFieldsValue(
      {
        competitions: checkedList
      }
      )
  };

  onCheckAllChange = e => {
    const { competitions: { competitionsList } } = this.props;
    const plainOptions = [];
    competitionsList.forEach((val) => {
      plainOptions.push(val.competitionId)
    });
    const competitions = e.target.checked ? plainOptions : [];
    this.props.form.setFieldsValue({
      competitions
    })
  };

  render() {
    const {
      showCompetitions: { isShow },
      competitions: { areaId, competitionsObj },
      area: { areaObj },
    } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="选择联赛"
        visible={isShow}
        onCancel={this.closeShowCompetitionsModal}
        width={660}
        footer={null}
        destroyOnClose
        bodyStyle={{
          minHeight: '400px',
          overflow: 'hidden',
          color: 'white',
          padding: 0,
        }}
      >
        <div className={styles.box}>
          <Row className={styles['submit-line']}>
            <div className={styles.submit} onClick={this.onCheck}>提交</div>
            <div className={styles.cancel} onClick={this.onCancel}>取消</div>
          </Row>
          {
            <Form>
              <Form.Item>
                <div className={styles['area-box']} >
                  <div className={styles['area-name']}>
                    <Checkbox
                      onChange={this.onCheckAllChange}
                    >
                      选择全部
                    </Checkbox>
                  </div>
                </div>
                {getFieldDecorator('competitions', {
                })(
                  <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={this.onChange}
                  >
                    {
                      areaId.map((item) => (
                        <Collapse area={areaObj[item]} key={item}>
                          {
                            competitionsObj[item].map((val) => (
                              <div className={styles['list-item']} key={val.competitionId}>
                                <Checkbox value={val.competitionId}>
                                  {val.competitionName}
                                </Checkbox>
                              </div>
                            ))
                          }
                        </Collapse>
                      ))
                    }
                  </Checkbox.Group>,
                )}
              </Form.Item>
            </Form>
          }
        </div>
      </Modal>

    );
  }
}

export default Form.create({ name: 'competitions' })(CompetitionsModal);
