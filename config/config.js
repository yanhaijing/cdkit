const config = [
    {
        root: './demo',
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
        root: './demo',
        excludePath: [
            'aaa',
            function (path) {
                return false;
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
