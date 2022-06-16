const ora = require("ora")
const chalk = require("chalk")
const inquirer = require('inquirer');
const downloadFile = require("download-git-repo");
const utils = require('util')
// 创建文件
class Create {
    constructor(name,dir){
        this.name = name
        this.dir = dir;
        this.axios = require('./axios')
        this.projectList = [];
        this.projectTagsList = [];
        this.downloadFile = utils.promisify(downloadFile)
        this.reposName = 'zhu-cli'
    }
    outputLog(fn){
        const log = console.log
        log(fn)
    }
    async fetchList(userName){
        const spinner = ora('正在获取模板列表')
        spinner.start();
        let res = null
        try {            
            //   let res = await this.axios.get('http://gitlab.vvupup.com/groups/aupup/-/children.json')
          res = await this.axios.get(`https://api.github.com/users/${userName}/repos`)
          this.outputLog(chalk.bgGreen("获取成功！！！"))
          spinner.stop();
          this.projectList = res;
          res = res.map(item=>item.name)
          console.log("看看响应。。。。",res);
        } catch (error) {
            
        }
      return res;
    }
    async fectTags(userName,reopsName){
        const spinner = ora('正在获取项目的tags')
        spinner.start()
        let res = await this.axios.get(`https://api.github.com/repos/${userName}/${reopsName}/tags`)
        this.projectTagsList = res;
        spinner.stop()
        return res.map(i=>i.name);
    }
    // 创建项目
    /**
     * 1、从 gitlab 上拉取 项目名
     * 2、根据对应的项目名去拉取代码
     */
    async createProject(){
       const list = await this.fetchList(this.reposName);
       const selProject = await this.showInquirer(list,"请选择需要下载的模板");
       this.outputLog(chalk.bgGreen(`选择了${selProject}`))
       const tagList = await this.fectTags(this.reposName,selProject);
       const selProjectTag = await this.showInquirer(tagList,"请选择tags");
       this.outputLog(chalk.bgGreen(`选择了${selProjectTag}`))
       await this.download(selProject,selProjectTag);
    };

    async showInquirer(list,message){
        const {projectName} = await inquirer.prompt({
            name:"projectName",
            type:"list",
            message:message,
            choices:list
        })
        return projectName
    }

    // 下载文件
    async download(projectName,projectTags){
        const spinner = ora('正在下载模板，请稍后。。。')
        spinner.start();
        try {
            //开始
            await this.downloadFile(`${this.reposName}/${projectName}${projectTags&&'#'+projectTags}`,this.dir)
            this.outputLog(chalk.bgGreen('/r下载成功'))

        } catch (error) {
            this.outputLog(chalk.bgRed('下载失败：',error))
        } finally{
            spinner.stop();
        }
        
        // downloadFile('zhu-cli/vue-template', this.dir, function (err) {
        //     console.log("看看错误 ---- ",err );
        //     if(!err){
        //         this.outputLog(chalk.bgGreen("下载成功"))
        //     }
        //     spinner.stop();
        //   })
    }
}
module.exports = Create