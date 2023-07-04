const { createProjectAction, addCpnAction } = require('./actions');

const createCommands = (program) => {
  //创建项目
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction);
  //添加组件
  program
    .command('addcpn <name>')
    .description(
      'add vue component，例如：why addcpn HelloWorld -d src/components'
    )
    .action((name) => {
      addCpnAction(name, 'src/components').then();
    });
};

module.exports = createCommands;
