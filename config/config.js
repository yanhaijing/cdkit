const config = {
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
};

module.exports = config;
