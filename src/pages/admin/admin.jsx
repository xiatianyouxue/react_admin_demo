import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from "antd"
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order/order'
const {Footer, Sider, Content, Header} = Layout
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>
        <Layout style={{minHeight: '100%'}}>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>
              <Switch>
                <Redirect from='/' exact to='/home'/>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/user' component={User}/>
                <Route path='/role' component={Role}/>
                <Route path="/charts/bar" component={Bar}/>
                <Route path="/charts/pie" component={Pie}/>
                <Route path="/charts/line" component={Line}/>
                <Route path="/order" component={Order}/>
              </Switch>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
