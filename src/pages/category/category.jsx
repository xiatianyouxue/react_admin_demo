import React from 'react';
import './category.less'
import {Card, Table, Button, message, Modal, Form, Input} from "antd"
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';
import LinkButton from "../../components/link-button"
import {reqCategorys, reqAddCategory, reqUpdateCategory} from "../../api"
import AddForm from "./add-form"
import UpDataForm from "./updata"

const {Item} = Form
export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],  // 一级分类列表
      loading: false,
      subCategorys: [], // 二级分类列表
      parentId: '0', // 当前需要显示的分类id
      parentName: '', //当前需要显示的分类名称
      showStatus: 0,  // 用来标识确认框是否显示  0代表隐藏  1 代表添加分类 2代表修改分类
      cateName: ''
    }
    this.updataRef = React.createRef()
  }

// 定义一个初始化table列名称的函数
  initColumn = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: 300,
        render: category => {
          return (
            <span>
              <LinkButton onClick={() => this.showUpdata(category)}>修改分类</LinkButton>
              {
                // 如何向事件回调函数中传递参数: 先定义一个匿名函数
                this.state.parentId === '0' ? <LinkButton onClick={() => {
                  this.showSubCategorys(category)
                }}>查看子分类</LinkButton> : null
              }

           </span>
          )
        },
      }
    ]
  }
// 获取一级分类
  getCategorys = async () => {
    const {parentId} = this.state
    // 数据出现前显示loading
    this.setState({
      loading: true
    })
    const result = await reqCategorys(parentId)
    // 得到数据之后隐藏loading
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      const categorys = result.data
      // 此时为0时显示的以及分类
      if (parentId === '0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({ // 显示二级分类
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取分类列表失败')
    }
  }
  // 显示指定一级分类的二级分类列表
  showSubCategorys = (categorys) => {
    this.setState({    // 更新状态是异步的
      parentId: categorys._id,
      parentName: categorys.name
    }, () => {
      // console.log(this.state.parentId)
      this.getCategorys()
    })
  }
  // 显示指定一级分类列表
  showCategorys = () => {
    // 更新为显示一列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  // render函数渲染之前
  UNSAFE_componentWillMount() {
    this.initColumn()
  }

  // 点击显示添加分类对话框
  showAdd = () => {
    this.setState({
      showStatus: 1
    });
  };
  // 点击显示修改分类对话框
  showUpdata = (category) => {
    // 保存状态
    this.category = category
    this.setState({
      showStatus: 2
    })
  }
  // 点击添加分类对话框确认按钮
  addCategory = e => {
    this.setState({
      showStatus: 0
    });

  };
  // 点击修改分类对话框确认按钮
  upDateCategory = async () => {
    this.setState({
      showStatus: 0
    });
    console.log(this.updataRef.current)
    console.log(this.updataRef.current.getFieldsValue())

    let categoryId = this.category._id
    let categoryName = this.form.getFieldsValue('categoryName')
    //发请求更新分类
    const result = await reqUpdateCategory({categoryId, categoryName})
    if (result.status === 0) {
      // 重新显示新的列表
      this.getCategorys()
    }

  }
  // 点击隐藏对话框
  handleCancel = e => {
    this.setState({
      showStatus: 0
    });
  };

  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const {categorys, loading, parentId, parentName, showStatus} = this.state
    // 读取指定的状态
    let category = this.category || {name: '一级分类'}  //如果还没有,先指定为空对象
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{margin: '0 10px'}}/>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' icon={<PlusOutlined/>} onClick={this.showAdd}>添加</Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          bordered
          dataSource={categorys}
          columns={this.columns}
          rowKey='_id'/>
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm categorys={categorys} parentName={parentName}/>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.upDateCategory}
          onCancel={this.handleCancel}
        >
          <Form ref={this.updataRef}>
            <Item>
              <Input value={category.name}/>
            </Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}
