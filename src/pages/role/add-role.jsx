import React from 'react';
import {Form, Input} from "antd"

const {Item} = Form

export default class AddRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Form>
        <Item rules={[{required: true, message: '用户名必须输入'}]} label={'角色名称'}>
          <Input placeholder='请输入用户名' />
        </Item>
      </Form>
    );
  }
}


