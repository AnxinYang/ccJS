module.exports = {
    entry: {
        //main: './src/index',
        //worker: './src/worker',
        index: './src/ccjs/cc',
    },
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    module: {
        rules: [
            {
                test: /js?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: __dirname + '/',
        filename: '[name].js'
    }

};