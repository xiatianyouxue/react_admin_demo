import React from 'react';
import {Form, Select, Input} from "antd"

const Item = Form.Item
const Option = Select.Option
// 分类添加对话框
export default class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef()
    console.log(props)
  }

  render() {
    const {categorys} = this.props
    return (
      <Form ref={this.formRef}>
        <Item>
          <Select value='一级分类'>
            {
              categorys.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
            }
          </Select>
        </Item>
        <Item>
          <Input placeholder='请输入分类名称'/>
        </Item>
      </Form>
    );
  }
}
