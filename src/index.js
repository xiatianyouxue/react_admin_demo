import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/reset.css'
import storageUtils from './utils/storageUtils'
import memoryUtil from './utils/memoryUtil'

// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtil.user = user
ReactDOM.render(<App />, document.getElementById('root'));


