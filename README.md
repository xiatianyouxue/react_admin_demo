# 项目流程介绍
### 1.创建项目目录
### 2.yarn eject把隐藏的配置文件显示出来
 - 执行这个命令之前需要先初始化git仓库
### 3.引入antd以及实现按需加载
 - yarn add antd babel-plugin-import
 - 在package.json文件中加入
 ```json
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }
      ]
    ]
  }
```
### 4.在项目中使用和配置less
 - yarn add less less-loader
 - 在webpack.config.js中加入以下代码
 ```js
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
    {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'less-loader'
              ),
              sideEffects: true,
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
                'less-loader'
              ),
            },
```
#### 5.react中ref的使用
```jsx harmony
 <Form onSubmit={this.handleSubmit} className="login-form" ref={this.formRef}>
</Form>
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    console.log(this.formRef.current)
  } 
```
