const config = {
    root: '/Users/yan/git/waimai_mfe_duodian/app',
    rules: [
        {
            test: /.*\.(js|jsx)/,
            replace: [
                {
                    from: 'app/component/common/getEnvHost',
                    to: 'app/tool/getEnvHost',
                },
                {
                    from: 'app/component/common/utils',
                    to: 'app/tool/utils',
                },
                {
                    from: 'module/common/utils',
                    to: 'app/tool/utils',
                },
                {
                    from: 'app/component/Common/MFEComponent',
                    to: 'app/component/MFEComponent/MFEComponent',
                },
                {
                    from: 'reactModule/search/Search',
                    to: 'app/component/Search/Search',
                },
                {
                    from: /reactComponent\/(.*)/,
                    to: 'app/component/$1',
                },
                {
                    from: /reactModule\/(.*)/,
                    to: 'app/component/$1',
                },
                {
                    from: /reactTools\/(.*)/,
                    to: 'app/tool/$1',
                }
            ]
        }
    ]
};

module.exports = config;
