import React from 'react';
import './category.less'
import {Card, Table, Button} from "antd"
import {PlusOutlined} from '@ant-design/icons';
import LinkButton from "../../components/link-button"
import {reqAddCategory, reqCategorys, reqUpdateCategory} from "../../api"

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const title = '一级分类列表'
    const extra = (
      <Button type='primary' icon={<PlusOutlined/>}>添加</Button>
    )

    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42
      }
    ];

    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'age',
        key: 'age',
        width: 300,
        render: text => {
          return (
            <span>
              <LinkButton>修改分类</LinkButton>
               <LinkButton>查看所有子分类</LinkButton>
           </span>
          )
        },
      }
    ];

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowkey={'_id'}/>
      </Card>
    );
  }
}
