
const { VueLoaderPlugin } = require("vue-loader")
module.exports = {
    mode: 'development',
    entry: {
        bundle: './src/index.js'
    },
    output: {
        // path: __dirname + '/dist',
        // filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // babel兼容性处理。
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        corejs: {
                                            version: 3,
                                        },
                                        // 按需加载
                                        // useBuiltIns: "usage",
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    devServer: {
        allowedHosts: "all",// 跨域访问
        host: '127.0.0.1',
        port: 3000,
        hot: false, // 关闭热重载
        // liveReload: false, // 关闭自动刷新
        // static: {
        //     publicPath: '127.0.0.1:3000/',
        // },
        client: {
            webSocketURL: {
                hostname: "127.0.0.1"
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}