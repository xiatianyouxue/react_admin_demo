import React from 'react';
import {Tree, Input, Form} from 'antd'
import menuList from '../../config/menuConfig'

const {Item} = Form
export default class AuthRole extends React.Component {
  constructor(props) {
    super(props);
    // 根据传入角色的menus生成初始状态
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus // 被选中的菜单项
    }
  }


  render() {
    const {role} = this.props
    return (
      <div>
        <Item label={'角色名称'}>
          <Input value={role.name} disabled/>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          treeData={menuList}
        >
        </Tree>
      </div>

    );
  }
}
