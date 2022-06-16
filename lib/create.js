const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer');
module.exports = async (projectName,options)=>{
    const targetDir = path.join(process.cwd(),projectName)
    console.log('项目路径是：',targetDir)
    // 创建项目第一步就是要判断同级目录下是否存在同名的目录
    const isExists = fs.existsSync(targetDir);
    console.log('存在同名目录。。。',isExists)
    if(isExists){
        if(options.force){   // 代表强制 覆盖
            await fs.remove(targetDir)
        }else{
           const {targetDirOptions} = await  inquirer.prompt({
                name:"targetDirOptions",
                type:"list",
                message:"当前目录下已经存在同名目录，是否覆盖？",
                choices:[
                    {
                        name:"是",
                    },
                    {
                        name:"否",
                    },
                ]
            })
            console.log("选择的是 ---- ",targetDirOptions)
            if(targetDirOptions==="是"){
                await fs.remove(targetDir)
            }else{
                console.log("退出。。。")
            }
        }
    }
    // 创建项目
    const Create = require("../utils/Create")
    const create = new Create(projectName,targetDir)
    create.createProject();
}