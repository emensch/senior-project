var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './client'
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js', '.jsx']
    },
    output: {
        path:       path.join(__dirname, 'dist'),
        filename:   'bundle.js',
        publicPath: '/'   
    },
    module: {
        loaders: [
            {
                test:       /\.jsx?$/,
                exclude:    /node_modules/,
                loader:     'babel'
            },
            {
                test:       /\.scss$/,
                loader:     'style-loader!css-loader!sass-loader'
            },
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};