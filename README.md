# [cdkit](https://github.com/yanhaijing/cdkit) [![npm](https://img.shields.io/badge/npm-1.3.0-orange.svg)](https://www.npmjs.com/package/cdkit) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/cdkit/blob/master/LICENSE)

code kit 代码助手，支持查找，删除，替换等功能，批量执行，可连续运行 

## 适合场景
1. 想要查找代码中的指定内容，需要多次查找，规则复杂时
2. 想要删除代码中的指定内容，需要持续删除时
3. 想要将代码中的指定代码替换为其他代码时，需要多次替换时

## 安装方式
依赖node，请确保本地已经安装[node](https://nodejs.org/en/)，使用npm进行安装

```bash
$ npm install -g cdkit # 全局安装，适合作为命令使用
$ npm install --save cdkit # 本地安装，适合api使用
```

## 命令使用
cdkit支持作为命令使用，全局安装后会有一个全局命令

```bash
$ npm install -g cdkit # 安装命令

$ cdkit --version # 1.0.0
```

cdkit支持三个子命令，`-c`是必选的配置文件，关于配置文件请看下面配置文件的说明

```bash
# -c 需要提供配置文件的路径
$ cdkit find -c 'xxxx.js' # 查找
$ cdkit del -c 'xxxx.js' # 删除
$ cdkit replace -c 'xxxx.js' # 替换
```

## API使用
cdkit也支持作为接口调用

```bash
$ npm install --save cdkit # 本地安装，适合api使用
```

在js中可引用cdkit提供的接口，返回值为匹配内容的信息，包括行列

```js
var cdkit = require('cdkit');

// config 是配置信息
cdkit.run('find', config); // 查找
cdkit.run('del', config); // 删除
cdkit.run('replace', config); // 替换
```

## 配置文件
cdkit的配置规则比较复杂，所以需要通过一个js文件来配置，配置文件需要返回一个js对象

- config 配置信息，可以包含多个配置对象
- root 绝对路径，要进行操作的根目录
- excludePath 排除的目录
- rules 进行替换的规则，可以包含多个
- test 正则，可以对文件进行过滤；也可是函数
- from 查找，删除，替换的内容，字符串或正则
- to 替换的内容，支持正则或函数，支持捕获引用

```js
const config = [
    {
        root: '/demo',
        rules: [
            {
                test: /.*\.js/,
                replace: [
                    {
                        from: /aa(a)/,
                        to: 'bbb$1',
                    }
                ]
            }
        ]
    },
    {
        root: '/demo',
        excludePath: [
            'aaa',
            /aaa/,
            function (path) {
                return path.indexOf('aaa') !== -1;
            }
        ],
        rules: [
            {
                test: function (path) {
                    return path.indexOf('.css') > -1;
                },
                replace: [
                    {
                        from: 'aaa',
                        to: function () {
                            return '123'
                        },
                    }
                ]
            }
        ]
    }
];

module.exports = config;
```

## 贡献者指南
修改CHANGELOG.md，修改package.json和README.md中的版本号，然后发布版本

```
$ npm run release
```
