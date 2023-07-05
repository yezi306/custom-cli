const { promisify } = require('util');
const path = require('path');

//promisify把download方法转成一个promise
const download = promisify(require('download-git-repo'));
// const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile, createDirSync } = require('../utils/utils');

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
};

//添加页面和路由
const addPageAndRouter = async (name, dest) => {
    const data = {
        name,
        lowerName: name.toLowerCase()
    };
    //1.编译ejs模板result
    const pageResult = await compile('vue-component.ejs', data);
    const routerResult = await compile('vue-router.ejs', data);

    //2.写入文件
    //判断path是否存在，如果不存在，创建对应的文件夹
    dest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(dest)) {
        const targetPagePath = path.resolve(dest, `${name}.vue`);
        const targetRouterPath = path.resolve(dest, `router.js`);
        writeToFile(targetPagePath, pageResult).then();
        writeToFile(targetRouterPath, routerResult).then();
    }
};

//添加store
const addStoreAction = async (name, dest) => {
    //1.编译ejs模板
    const storeResult = await compile('vuex-store.ejs', {});
    const typesResult = await compile('vuex-types.ejs', {});

    //2.写入文件
    const targetDest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(dest)) {
        const targetStorePath = path.resolve(targetDest, `${name}.js`);
        const targetTypesPath = path.resolve(targetDest, `type.js`);
        writeToFile(targetStorePath, storeResult).then();
        writeToFile(targetTypesPath, typesResult).then();
    }
};

module.exports = {
    createProjectAction,
    addCpnAction,
    addPageAndRouter,
    addStoreAction
};
