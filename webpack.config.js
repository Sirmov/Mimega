const path = require('path');

module.exports = {
    entry: {
        vendor: path.resolve(__dirname, 'src', 'vendor.js'),
        main: path.resolve(__dirname, 'src', 'app.js')
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets/images'
                    }
                }
            }
        ]
    }
};
