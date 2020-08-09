import React from 'react';
import {Form, Input} from "antd"
import PropTypes from 'prop-types'

const {Item} = Form
export default class UpDataForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {categoryName} = this.props
    return (
      <Form>
        <Item>
          <Input value={categoryName}/>
        </Item>
      </Form>
    );
  }
}
