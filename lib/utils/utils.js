const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

//编译ejs模板
const compile = (template, data) => {
    const templatePosition = `../template/${template}`;
    const templatePath = path.resolve(__dirname, templatePosition);
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data }, {}, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

//例如：创建source/components/category
const createDirSync = (pathName) => {
    if (fs.existsSync(pathName)) {
        return true;
    } else {
        //path.dirname可以拿到父路径source/components
        if (createDirSync(path.dirname(pathName))) {
            fs.mkdirSync(pathName);
            return true;
        }
    }
};

//把编译出来的模板写入文件
const writeToFile = (path, content) => {
    return fs.promises.writeFile(path, content);
};

module.exports = {
    compile,
    writeToFile,
    createDirSync
};
