import React from 'react';
import {Form, Input, Select} from "antd"
import PropTypes from 'prop-types'


export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static proTypes = {
    roles: PropTypes.array.isRequired
  }

  render() {
    const {roles} = this.props
    // console.log(roles)
    return (
      <div>1111</div>
    );
  }
}
