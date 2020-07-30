import ajax from './ajax'
// import {message} from 'antd'

// const BASE = 'http://localhost:5000'
const BASE = ''
// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')
