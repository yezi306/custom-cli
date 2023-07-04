/**
 * 执行终端命令相关的代码
 */
const { spawn } = require('child_process');

const commandSpawn = (command,args,options)=>{
    return new Promise((resolve, reject)=>{
        const childProcess = spawn(command,args,options);
        //把子进程的输出流信息给放到主进程里，方便在npm install时可以看到输出信息
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        //监听到子进程的命令执行完成
        childProcess.on('close',()=>{
            resolve();
        })
    })
}

module.exports = {
    commandSpawn
}