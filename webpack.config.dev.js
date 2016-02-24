var path = require('path');
var webpack = require('webpack');

var BABEL_QUERY = {
    presets: ['react', 'es2015', 'stage-0'],
    plugins: [
        [
            'react-transform',
            {
                transforms: [
                    {
                        transform:  'react-transform-hmr',
                        imports:    ['react'],
                        locals:     ['module']
                    }
                ]
            }
        ]
    ]   
};

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
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
                loader:     'babel',
                query:      BABEL_QUERY
            },
            {
                test:       /\.scss$/,
                loader:     'style-loader!css-loader!sass-loader'
            },
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};