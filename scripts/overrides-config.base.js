const webpack = require('webpack');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports.stylusLoaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
    options: {
        stylus: {
            use: [
                poststylus([
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',//统计有百分之1的使用率
                            'last 4 versions',//浏览器最后的4个版本
                            'Firefox ESR',//火狐ESR版本
                            'not ie < 9',//排除ie9以下的版本
                        ],
                        flexbox: 'no-2009',
                    })
                ])
            ]
        }
    }
})

//设置根路径
function resolve(dir){
    return path.join(__dirname,'..',dir)
}
module.exports.rootPath = resolve('src');