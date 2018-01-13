const baseConfig = require('./overrides-config.base');//引入公共配置文件

module.exports = function(config) {

    // Use your ESLint
    /*let eslintLoader = config.module.rules[0];
     eslintLoader.use[0].options.useEslintrc = true;*/

    // Add the stylus loader second-to-last
    // (last one must remain as the "file-loader")
    let loaderList = config.module.rules[1].oneOf;
    loaderList.splice(loaderList.length - 1, 0, {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
    });

    config.plugins.push(baseConfig.stylusLoaderOptionsPlugin);//把公共配置文件加入

    let alias = config.resolve.alias;//获得别名配置
    alias['@'] = baseConfig.rootPath;//设置根目录别名
};