import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox, Modal, Row, Form, Icon } from 'antd';
import styles from './index.scss'

@connect(({ showCompetitions,area, competitions }) => ({
  showCompetitions,
  area,
  competitions
}))
class CompetitionsModal extends Component {
  state = {
    checkedList: [],
    showArea:[-1]
  };

  componentDidMount() {
    const { dispatch,params } = this.props;
    dispatch({
      type: 'competitions/fetchModalList',
      payload: {
        ...params,
      },
    });
  }

  onCheck = () => {
    const { fn } = this.props;
    if(this.props.form.getFieldsValue().competitions ===undefined){
      this.closeShowCompetitionsModal()
    }else{
      fn(this.props.form.getFieldsValue());
      this.closeShowCompetitionsModal()
    }
  };

  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'showCompetitions/toggle',
      payload: false
    })
  };

  closeShowCompetitionsModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'showCompetitions/toggle',
      payload: false
    })
  };

  showArea = (id) => {
    const { showArea } = this.state;
    showArea.push(id);
    const arr = showArea.concat();
    this.setState({
      showArea: arr
    })
  };

  closeArea = (id) => {
    const { showArea } = this.state;
    const index = showArea.indexOf(id);
    showArea.splice(index, 1);
    const arr = showArea.concat();
    this.setState({
      showArea: arr
    })
  };


  render() {
    const { showCompetitions : {isShow}, competitions: {competitionsModalList, areaId, competitionsObj },  area:{ areaObj}, } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { showArea } = this.state;
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
          color:'white',
          padding:0
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
                {getFieldDecorator('competitions', {})(
                  <Checkbox.Group style={{ width: '100%' }}>
                    {
                      areaId.map((item) => (
                        <div className={styles['area-box']} key={item}>
                          <div className={styles['area-name']}>
                            {
                              showArea.includes(item) ?
                                <div className={styles.arrow} onClick={() => this.closeArea(item)}>
                                <Icon type="caret-up" />
                                </div>:
                                <div className={styles.arrow} onClick={() => this.showArea(item)}>
                                  <Icon type="caret-down" />
                                </div>
                            }
                            <div className={styles.name}>{ areaObj[item] }</div>
                          </div>
                          {
                            showArea.includes(item) ?
                            competitionsObj[item].map((val) => (
                              <div className={styles['list-item']} key={val.competitionId}>
                                <Checkbox value={val}>
                                  {val.competitionName}
                                </Checkbox>
                              </div>
                            )): ''
                          }
                        </div>
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

export default Form.create({name: 'competitions'})(CompetitionsModal);
