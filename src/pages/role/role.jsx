import React from 'react';
import './role.less'
import {Button, Card, Form, Input, message, Modal, Table} from "antd"
import {reqAddRole, reqRoles, reqUpdateRole} from "../../api"
import AuthRole from "./auth-role"
import {formateDate} from '../../utils/dateUtils'

const {Item} = Form
export default class Role extends React.Component {

  constructor(props) {
    super(props)
    this.addRoleRef = React.createRef()
    this.auth = React.createRef()
    this.state = {
      roles: [], // 所有觉得列表
      role: {}, // 选中的对象
      addRoleVisible: false, //添加角色对话框默认不显示
      authRoleVisible: false // 设置角色权限对话框是否显示
    }
  }

  // 初始化角色列表行属性
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time) => formateDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }
  // 获取所有角色列表
  getRoles = async () => {
    const result = await reqRoles()
    console.log(result)
    if (result.status === 0) {
      const roles = result.data
      // console.log(roles)
      this.setState({
        roles
      })
    }
  }

  onRow = (role) => {
    // console.log(role)
    return {
      onClick: event => { // 点击行
        this.setState({
          role
        })
      },
    }
  }
  // 显示创建用户对话框
  showModal = () => {
    this.setState({
      addRoleVisible: true
    });
  }
  // 创建角色确定按钮
  addRole = () => {
    // 进行表单验证, 只能通过了才向下处理
    this.addRoleRef.current.validateFields().then(async values => {
      // 隐藏确认框
      this.setState({
        addRoleVisible: false
      })
      // console.log(values)
      // 收集输入数据
      const {roleName} = values
      this.addRoleRef.current.resetFields() // 清空表单数据

      // 请求添加
      const result = await reqAddRole(roleName)
      // console.log(result)
      // 根据结果提示/更新列表显示
      if (result.status === 0) {
        message.success('添加角色成功')
        // this.getRoles()
        // 新产生的角色
        const role = result.data
        console.log(this.state.roles)
        // 更新roles状态
        /*const roles = this.state.roles
        roles.push(role)
        this.setState({
          roles
        })*/

        // 更新roles状态: 基于原本状态数据更新
        this.setState(state => ({
          roles: [...state.roles, role]
        }))

      } else {
        message.success('添加角色失败')
      }
    })
  }
  updateRole = async () => {

    // 隐藏确认框
    this.setState({
      isShowAuth: false
    })

    const role = this.state.role
    // 得到最新的menus
    console.log(this.auth.current)
    role.menus = this.auth.current.props.role.menus
    role.auth_time = Date.now()
    console.log(this.props)
    role.auth_name = this.props.user.username

    // 请求更新
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      // this.getRoles()
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role._id === this.props.user.role_id) {
        this.props.logout()
        message.success('当前用户角色权限成功')
      } else {
        message.success('设置角色权限成功')
        this.setState({
          roles: [...this.state.roles]
        })
      }

    }
  }
  handleCancel = e => {
    this.setState({
      addRoleVisible: false,
      authRoleVisible: false
    })
    this.addRoleRef.current.resetFields()
  }
  showAuthRole = () => {
    this.setState({
      authRoleVisible: true
    })
  }
  // 给角色授权确定按钮
  authRoles = () => {
    this.setState({
      authRoleVisible: false
    })
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const {roles, role, addRoleVisible, authRoleVisible} = this.state
    const title = (
      <span>
        <Button type='primary' style={{marginRight: 10}}
                onClick={this.showModal}>创建角色</Button>
        <Button type='primary' disabled={!role._id} onClick={this.showAuthRole}>设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          boreded
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: 3}}
          rowSelection={{
            type: 'radio', selectedRowKeys: [role._id],
            onSelect: (role) => { // 选择某个radio时回调
              this.setState({
                role
              })
            }
          }}
          rowKey='_id'
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={addRoleVisible}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          {/*<AddRole ref={this.addRoleRef}/>*/}
          <Form ref={this.addRoleRef}>
            <Item rules={[{message: '用户名必须输入'}]} label={'角色名称'} name='roleName'>
              <Input placeholder='请输入用户名'/>
            </Item>
          </Form>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={authRoleVisible}
          onOk={this.updateRole}
          onCancel={this.handleCancel}
        >
          <AuthRole role={role} ref={this.auth}/>
        </Modal>
      </Card>
    );
  }
}
