## 脚手架功能
1. 创建项目
2. 选择UI框架 
2. 是否启用 ts （启用ts就下载ts相关的项目）
## 创建cli文件
### 1、创建cli命令
我们知道，每一个cli命令，包括 `vue-cli`、`create-app`的cli命令都是在 node_modules/.bin/ 文件下执行的（更多细节：https://juejin.cn/post/7078924628525056007），所以我们先创建 要执行的的cli命令文件夹 bin及其cli文件 cli（无后缀）：
```
#! /usr/bin/env node   --- 这一行代表使用当前系统中的 node去执行这个文件
console.log('zhu-cli -----')   
```
### 2、package.json 中增加 bin 命令
```
  "bin": {
    "zhu": "./bin/cli"  // 告诉 node 我们的 cli 命令是： zhu 入口执行文件是 bin/cli
  },
```
### 3、npm link
执行这个命令创建一个映射，将我们这个cli，映射到全局 也就是我们在 cmd 中输入`zhu`，那么就会找到我们这个项目
## 读取命令行参数
包括 `vue-cli`等大部分的cli工具使用的都是`commander`包获取命令行参数  
我们根据`commander`的API文档（https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B）去操作即可
```
const {program} = require("commander");
program
 .version(`zhu-cli@${packageObj.version}`)   // 设定版本号  调用命令 zhu --version
 .usage(`<command> [option]`)

//  创建项目的命令
program
 .command('create <app-name>')  //  create 创建项目
 .option('-f,--force','强制性更改项目名')  // 增加命令的 指令
 .description('创建一个 项目')   // 命令描述
 .action((name,command)=>{
     require('../lib/create')(name,command)   // 这个逻辑在 lib/create 中
 })
```
## 下载模板
我们使用`download-git-repo`包下载模板，具体用法可以参考npm  
我们使用这个包从`github`上拉取对应的项目和对应的文件，这里面有用到github的API：https://docs.github.com/cn/rest/repos#list-tags
## loading加载框
我们使用 `ora` 来实现Loading加载框
## 更美观的提示chalk
我们使用 `chalk` 来实现控制台的更美观的提示