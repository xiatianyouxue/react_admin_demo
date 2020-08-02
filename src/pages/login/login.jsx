import React from 'react'
import {Redirect} from 'react-router-dom'
import {
  Form,
  Input,
  Button, message,
} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import './login.less'
import {reqLogin} from "../../api"
import memoryUtil from "../../utils/memoryUtil"
import storageUtils from "../../utils/storageUtils"
const Item = Form.Item // 不能写在import之前
class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault() // 阻止默认行为
    // console.log(this.formRef.current)
    this.formRef.current.validateFields().then(value => {
      // 打印出来的是用户输入的用户名和密码
      const {username, password} = value
      reqLogin(username, password).then(res => {
        if (res.status === 0) {// 说明登录成功
          //跳转到后台主页面
          message.success('登录成功')
          // 将用户信息保存在内存中
          const user = res.data
          // console.log(res)
          memoryUtil.user = user // 保存在内存中
          storageUtils.saveUser(user) // 保存到local中
          this.props.history.replace('/')
        }
      })
    })

  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    const user = memoryUtil.user
    if(user && user._id) {
      return <Redirect to='/'/>
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form" ref={this.formRef}>
            <Item
              name={'username'}
              rules={[
                {required: true, whitespace: true, validateTrigger: 'blur', message: '用户名必须输入'},
                {min: 4, message: '用户名至少4位'},
                {max: 12, message: '用户名最多12位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
              ]}>
              <Input
                prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="用户名"
                // defaultValue ='admin'
              />
            </Item>
            <Form.Item
              name={'password'}
              rules={[
                {required: true, whitespace: true, validateTrigger: 'blur', message: '用户名必须输入'},
                {min: 4, message: '密码至少4位'},
                {max: 12, message: '用户名最多12位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
              ]}>
              <Input
                prefix={<LockOutlined type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="密码"
                // defaultValue ={'admin'}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

// console.log(Form.create({})(Login))
// const WrapLogin = Form.create({})(Login)
// export default WrapLogin
export default Login
