const { promisify } = require('util');
const path = require('path');

//promisify把download方法转成一个promise
const download = promisify(require('download-git-repo'));
// const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile } = require('../utils/utils');

//callback -> promisify(函数) -> promise -> async
//创建项目并运行
const createProjectAction = async (project) => {
  console.log('why helps you create your project...');

  //1.clone项目 download(clone地址，存放的目录，是否clone所有文件内容)
  await download(vueRepo, project);

  //2.执行npm install(windows电脑上要写'npm.cmd',Mac上则不用)
  console.log('开始执行npm install...');
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` });

  //3.运行npm run serve
  console.log('开始运行npm run serve...');
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` }).then();
  //注意：npm run serve命令执行时该子进程不会结束，只有按下ctrl+c才会结束进程，所以主进程在这里被阻塞了。

  //4.打开浏览器
  // open('https://localhost:8080/').then();
};

//添加组件
const addCpnAction = async (name, dest) => {
  //1.编译ejs模板result
  const result = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase()
  });
  console.log(result);

  //2.将result写入到文件中
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result).then();

  //3.放到对应的文件夹中
};
module.exports = {
  createProjectAction,
  addCpnAction
};
