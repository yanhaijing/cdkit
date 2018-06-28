#!/usr/bin/env node
var path = require('path');
var yargs = require('yargs');

var cdkit = require('../index.js');

yargs
    .usage('usage: cdkit [options]')
    .usage('usage: cdkit <command> [options]')
    .alias("h", "help")
    .option('config', {
        alias: 'c',
        demand: true,
        type: 'string',
        describe: '配置文件的绝对路径',
    })
    .command('find', '查找', function (yargs) {
        run('find', yargs.argv)
    })
    .command('del', '删除', function (yargs) {
        run('del', yargs.argv)
    })
    .command('replace', '替换', function (yargs) {
        run('replace', yargs.argv)
    }).argv;

function run(cmd, argv) {
    if (!argv.config) {
        console.log('config参数不能缺省')
        return;
    }

    var config = require(path.resolve(argv.config));

    if (!config) {
        console.log('config文件必须导出配置');
        return;
    }

    // 运行命令
    cdkit.run(cmd, config);
}
