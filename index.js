#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const helpOptions = require('./lib/core/help.js');
const createCommands = require('./lib/core/create.js');

//查看版本号
program.version(require('./package.json').version);

//帮助和可选信息
helpOptions(program);

//创建其他指令
createCommands(program);

//解析
program.parse(process.argv);
