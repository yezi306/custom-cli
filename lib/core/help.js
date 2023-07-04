
const helpOptions = (program)=>{
    //增加自己的options
    program.option('-w,-why','a why cli');
    program.option('-d,--dest <dest>','a destination folder,例如：-d /why/src/view');
    program.option('-f,--framework <framework>','your framework,例如：-f vue');

//监听指令
    program.on('--help',function (){
        console.log('');
        console.log('Others:');
        console.log('   other options~');
    })
}

module.exports = helpOptions;
