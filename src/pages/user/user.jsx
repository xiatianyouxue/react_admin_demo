import React from 'react';
import {Button, Card, Form, Input, message, Modal, Select, Table} from "antd"
import './user.less'
// import AddUser from "./add-form"
import {formateDate} from "../../utils/dateUtils"
import LinkButton from "../../components/link-button/index"
import {reqAddOrUpdateUser, reqDeleteUser, reqUsers} from "../../api/index"

const {Option} = Select;
const {Item} = Form
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddShow: false, // 添加用户对话框是否显示
      users: [], // 所有用户列表
      roles: [], //所有角色列表
      deleteModalIsShow: false
    }
    this.addFormRef = React.createRef()
  }

  // 点击显示添加用户对话框
  showAdd = () => {

    this.user = null //
    console.log(this.user)
    this.setState({
      isAddShow: true
    })
  }
  // 点击确认添加用户按钮
  handleOk = () => {
    this.setState({
      isAddShow: false
    })
    // this.addFormRef.current.resetFields()
    // 收集表单数据
    // console.log(this.addFormRef)
    this.addFormRef.current.validateFields().then(async user => {
      console.log(user)
      console.log(this.user)
      // let user = this.user
      // 如果是修改,要给它指定id
      if (this.user) {
        // eslint-disable-next-line no-undef
        user._id = this.user._id
      }
      // 2.发送ajax请求
      const result = await reqAddOrUpdateUser(user)
      console.log(result)
      if (result.status === 0) {
        message.success(`${this.user ? '修改' : '添加'}用户成功`)
        // 3.更新用户列表
        this.getUsers()
      }
    })


  }
  // 点击取消隐藏对话框
  handleCancel = () => {
    this.setState({
      isAddShow: false
    })
    this.addFormRef.current.resetFields()
  }


  // 获取用户列表
  getUsers = async () => {
    const result = await reqUsers()
    // console.log(result)
    if (result.status === 0) {
      // console.log(result)
      const {users, roles} = result.data
      this.setState({
        users,
        roles
      })
    }
  }
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id'
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUpdate(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }
  // 点击显示修改用户对话框
  showUpdate = (user) => {
    this.user = user  //保存用户信息
    // console.log(user)
    this.setState({
      isAddShow: true
    })
  }
  // 点击删除按钮删除用户信息
  deleteUpdate = (user) => {
    // console.log(user)
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        console.log(result)
        if (result.status === 0) {
          message.success('删除用户成功')
          this.getUsers() // 刷新用户列表
        }
      }
    })
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
    const {users, roles} = this.state
    const user = this.user || {}
    return (
      <Card title={title}>
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={this.state.isAddShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            ref={this.addFormRef}
            labelCol={{span: 4}}
            wrapperCol={{span: 14}}
            layout="horizontal"
          >
            <Item label="用户名" name='username' initialValue={user.username}>
              <Input placeholder='请输入用户名'/>
            </Item>
            {
              user._id ? null : <Item label="密码" name='password' initialValue={user.password}>
                <Input placeholder='请输入密码' type='password'/>
              </Item>
            }

            <Item label="手机号" name='phone' initialValue={user.phone}>
              <Input placeholder='请输入手机号' type={'phone'}/>
            </Item>
            <Item label="邮箱" name='email' initialValue={user.email}>
              <Input placeholder='请输入邮箱'/>
            </Item>
            <Item label="角色" name='role_id' initialValue={user.role_id}>
              <Select style={{width: 120}}>
                {
                  roles.map(item => <Option value={item.name} key={item._id}>{item.name}</Option>)
                }
              </Select>
            </Item>
          </Form>
        </Modal>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}/>
      </Card>
    );
  }
}
