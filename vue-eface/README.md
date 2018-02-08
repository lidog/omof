# vue框架种子工程

## 安装淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org 

## 命令

- `npm run dev` : 开发模式
- `npm run build` : 生产模式

## 项目结构

```
vue-seed
    |-- build  `构建工程配置`
    |-- config `构建参数配置`
    |-- dist `存放生产代码，用于部署`
    |-- node_modules `npm包`
    |-- src
        |-- assets `静态文件`
            |-- css `样式文件`a
                |-- index.scss `集体到处样式`
                |-- base.scss `公共样式`
                |-- standard.scss `UI规范样式: 变量、方法`
                |-- reset.css `样式重置表`
            |-- js `js文件`
            |-- font `字体文件`
            |-- images `图片`
        |-- components `组件`
        |-- container `容器(放比较复杂的逻辑)`
        |-- page `页面`
        |-- router `路由配置`
        |-- utils `工具方法`
        |-- App.vue `根页面`
        |-- index.js `工程入口js`
    |-- .babelrc `babel编译配置`
    |-- .editorconfig `编辑器配置`
    |-- .gitignore `git提交忽略规则配置`
    |-- .postcssrc.js `postcss配置`
    |-- index.html `模板html`
    |-- package-lock.json `npm包版本锁定`
    |-- package.json `npm包管理`
    |-- README.md `说明`
```

## 快速运行 
进入到vue目录中，在命令行依次输入如下命令：  

```
## 安装依赖
cnpm install`

# 在 localhost:8080 启动项目
npm run dev
```  

## 发布
依然进入到vue目录，然后执行如下命令：  

```
npm run build
```  