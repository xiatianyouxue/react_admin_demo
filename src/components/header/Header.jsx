import React from 'react';
import './Header.less'
import {reqWeather} from "../../api"
import {formateDate} from "../../utils/dateUtils"
import {withRouter} from 'react-router-dom'
import menuList from "../../config/menuConfig"
import {Modal} from "antd"
import memoryUtil from "../../utils/memoryUtil"
import storageUtils from "../../utils/storageUtils"
import LinkButton from "../link-button"
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: formateDate(Date.now()),
      dayPictureUrl: '', // 天气图片url
      weather: '' // 天气情况
    }
  }

  // 冬天更新时间
  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }
  // 获取天气情况
  getWeather = async () => {
    const {dayPictureUrl, weather} = await reqWeather('武汉')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
//
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
// 退出功能
  layout = () => {
    Modal.confirm({
      content: '确定要退出吗?',
      onOk: () => {
        // 删除在内容中的user信息
        storageUtils.removeUser()
        memoryUtil.user = {}
        this.props.history.replace('/login')
      }
    })
  }

  componentDidMount() {
    this.getWeather()
    this.getTime()
  }

  // 当前组件卸载之前调用
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render() {
    const {dayPictureUrl, weather, currentTime} = this.state
    const title = this.getTitle()
    const username = memoryUtil.user.username
    return (
      <div className={'header'}>
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton  onClick={this.layout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header)
