const path = require('path');

module.exports = {
    entry: {
        ajaxcom: './src/ajaxcom.ts'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
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
    cache: true,
    stats: 'minimal',
    devtool: 'source-map',
    watchOptions: {
        aggregateTimeout: 80,
        ignored: [/node_modules/]
    },
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
    }
};
