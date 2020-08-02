import React from 'react';
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'
import {Menu} from 'antd'
import {Link, withRouter} from "react-router-dom"

const {SubMenu, Item} = Menu;

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
      }
    })
  }

  render() {
    // 通过withRouter属性可以获取非路由组件的locathion mathch等属性
    const path = this.props.location.pathname
    return (
      <div className={'left-nav'}>
        <Link className='left-nav-header' to={'/'}>
          <img src={logo} alt=""/>
          <h1>后台管理系统</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          mode="inline"
          theme="dark"
        >
          {/*<Item key="8" icon={<AppstoreOutlined/>}>
            <Link to={'/home'}>首页</Link>
          </Item>
          <SubMenu key="sub2" icon={<MenuUnfoldOutlined/>} title="商品">
            <Item key="9" icon={<DesktopOutlined/>}>
              <Link to={'/category'}>商品分类</Link>
            </Item>
            <Item key="10" icon={<PieChartOutlined/>}>
              <Link to={'/product'}>商品分类</Link>
            </Item>
          </SubMenu>*/}
          {
            this.getMenuNodes(menuList)
          }
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftNav)
