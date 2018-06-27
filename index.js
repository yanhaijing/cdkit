const config = require('./config/temp-config.js');

const path = require('path');

const fs = require('fs');

const rootPath = path.resolve(config.root);

const rules = config.rules;

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

travel(rootPath, function (pathname) {
    let file = fs.readFileSync(pathname, {encoding: 'utf8'});

    let flag = false;
    
    // 每个文件都要执行所有规则
    rules.forEach(function (r) {
        if (!r.test.test(pathname)) return;

        // 对文件内容进行替换
        r.replace.forEach(function (rp) {
            let res;
            // 支持字符串和正则的替换
            while(res = file.match(rp.from)) {
                // 支持替换中的正则引用 $0 $1 $2
                let to = rp.to.replace(/\$(\d+)/g, function (match, p1) {
                    return res[p1] || ''
                });

                file = file.replace(rp.from, to);
                flag = true;
            }
        })
    });

    if (flag) {
        console.log('替换文件', pathname);
        fs.writeFileSync(pathname, file);
    }
});
