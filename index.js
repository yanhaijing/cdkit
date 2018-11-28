var fs = require('fs');
var path = require('path');

var travel = require('./util/util.js').travel;

var defaultConfig = {
    root: '',
    excludePath: [],
    rules: [],
};

function getPosition(file, str) {
    file = file.slice(0, file.indexOf(str));

    var rowIndex = file.lastIndexOf('\n') + 1;

    var rowFile = file.slice(0, rowIndex);
    var colFile = file.slice(rowIndex);

    var ls = rowFile.match(/\n/g);
    return {
        line: ls ? ls.length : 0,
        column: colFile.length,
    }
}

function run(cmd, config) {
    var res = [];

    config.forEach(function (conf, index) {
        conf = Object.assign({}, defaultConfig, conf);

        var groupRes = {};
        res.push(groupRes);

        console.log('第' + index + '组配置：start');

        var rootPath = path.resolve(conf.root);
        var rules = conf.rules;

        travel(rootPath, function (pathname) {
            var pathRes = [];

            var file = fs.readFileSync(pathname, {encoding: 'utf8'});

            var count = 0;
            
            // 每个文件都要执行所有规则
            rules.forEach(function (r) {
                // r.test是函数或者正则
                if (typeof r.test === 'function') {
                    if (!r.test(pathname)) return;
                } else {
                    if (!r.test.test(pathname)) return;
                }

                // 对文件内容进行替换
                r.replace.forEach(function (rp) {
                    var res;
                    // 支持字符串和正则的替换
                    while(res = file.match(rp.from)) {
                        count += 1;

                        var pos = getPosition(file, res[0]);

                        pathRes.push({
                            from: rp.from,
                            match: res[0],
                            line: pos.line,
                            column: pos.column,
                        });

                        if (cmd === 'find') {
                            // 查找，需要替换，否则会死循环
                            file = file.replace(rp.from, '');
                        } else if (cmd === 'del') {
                            file = file.replace(rp.from, '');
                        } else {
                            // 支持函数
                            // 支持替换中的正则引用 $0 $1 $2
                            var to = typeof rp.to === 'function' ? rp.to:  rp.to.replace(/\$(\d+)/g, function (match, p1) {
                                return res[p1] || ''
                            });

                            file = file.replace(rp.from, to);
                        }
                    }
                })
            });

            if (count) {
                console.log('文件：', pathname, cmd + '次数：' + count);
                if (cmd !== 'find') {
                    fs.writeFileSync(pathname, file);
                }

                groupRes[pathname] = pathRes;
            }
        }, conf.excludePath);
        console.log('第' + index + '组配置：end');
        console.log('########################');
    });

    return res;
}

exports.run = run;
