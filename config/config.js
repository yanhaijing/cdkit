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
        rules: [
            {
                test: /.*\.css/,
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
