const {
    createProjectAction,
    addCpnAction,
    addPageAndRouter,
    addStoreAction
} = require('./actions');

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
            addCpnAction(name, program.dest || 'src/components').then();
        });

    //添加页面
    program
        .command('addpage <page>')
        .description(
            'add vue page and add router config，例如：why addpage Home [-d src/pages]'
        )
        .action((page) => {
            addPageAndRouter(page, program.dest || 'src/pages').then();
        });

    //添加store
    program
        .command('addstore <store>')
        .description('add store config，例如：why addstore Home [-d src/pages]')
        .action((store) => {
            addStoreAction(store, program.dest || 'src/store/modules').then();
        });
};

module.exports = createCommands;
