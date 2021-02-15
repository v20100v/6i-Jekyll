const path = require('path');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

// const EnvironmentDev = process.env.NODE_ENV !== 'production';
const EnvironmentDev = false;
const jekyllSource = path.join(__dirname);
const webpackSource = path.join(jekyllSource, '_webpack');
const webpackOutput = path.join(jekyllSource, 'assets', 'build');

module.exports = {
    entry: {
        main: path.join(webpackSource, 'js', 'main.js'),
        consologo: path.join(webpackSource, 'js', 'consologo.js'),
        projects: path.join(webpackSource, 'js', 'projects.js'),
        page: path.join(webpackSource, 'js', 'page.js')
    },
    output: {
        filename: EnvironmentDev ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
        path: path.join(webpackOutput)
    },
    plugins: [
        // Clean output directory every launch
        new CleanWebpackPlugin(),
        // Extracts CSS into separate files per JS file
        new MiniCssExtractPlugin({
            filename: EnvironmentDev ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: EnvironmentDev ? '[id].css' : '[id].[contenthash].css',
        }),
        // Copies individual files or entire directories, which already exist, to the build directory.
        new CopyPlugin({
            patterns: [
                {from: path.join(webpackSource, 'images'), to: 'images/[path][name].[ext]'},
                {from: path.join(webpackSource, 'static'), to: 'static/[path][name].[ext]'}
            ],
        }),

        // Must be the last plugins, in order to write out stats file to build directory.
        new AssetsPlugin({
            filename: 'webpackstats.json',
            path: path.join(jekyllSource, '_data'),
            prettyPrint: !EnvironmentDev,
            includeAllFileTypes: true,
            removeFullPathAutoPrefix: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Extracts CSS into separate files
                    {loader: MiniCssExtractPlugin.loader, options: {}},
                    // Translates CSS into CommonJS
                    {loader: 'css-loader', options: {url: false, sourceMap: true}},
                    // Compiles Sass to CSS
                    {loader: 'sass-loader', options: {sourceMap: true}},
                    // Transforming style with PostCSS tool
                    'postcss-loader'
                ],
            }
        ]
    }
};