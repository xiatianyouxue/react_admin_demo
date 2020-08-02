import React from 'react';
import './home.less'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={'home'}>
        <span>欢迎来到后台管理系统</span>
      </div>
    );
  }
}
