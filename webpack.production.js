const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        ajaxcom: './src/ajaxcom.ts'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].min.js',
        library: "ajaxcom",
        libraryTarget: "umd",
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve('./src')
        ],
        extensions: ['.ts'],
    },
    stats: 'minimal',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useTranspileModule: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};
