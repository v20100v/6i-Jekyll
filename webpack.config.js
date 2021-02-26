const path = require('path');
const fs = require('fs');
const moment = require('moment');

const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const EnvironmentDev = process.env.NODE_ENV !== 'production';
const jekyllSource = path.join(__dirname);
const webpackSource = path.join(jekyllSource, '_webpack');
const webpackOutput = path.join(jekyllSource, 'assets', 'build');
const package = require('./package.json');

module.exports = {
    entry: {
        main: path.join(webpackSource, 'js', 'main.js'),
        projects: path.join(webpackSource, 'js', 'views', 'projects.js'),
        tags: path.join(webpackSource, 'js', 'views', 'tags.js'),
        page: path.join(webpackSource, 'js', 'views', 'page.js'),
        contact: path.join(webpackSource, 'js', 'views', 'contact.js')
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

        // Banner Plugin
        new webpack.BannerPlugin({
            banner: () => {
                let lastDateGeneration = moment().format();

                fs.writeFileSync(path.join(jekyllSource, '_data', 'build.json'), JSON.stringify({
                    version: package.version,
                    environment: (EnvironmentDev) ? 'dev' : 'production',
                    lastDateGeneration: lastDateGeneration
                }, null, ' '));

                return EnvironmentDev ? '' : '6i Jekyll v' + package.version + ' (' + package.homepage + ')\n' +
                    'Copyright 2020-' + moment().year() + ', v20100v (https://github.com/v20100v)\n' +
                    'Last generation on ' + lastDateGeneration + '.\n' +
                    'Licensed under MIT.';
            },
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
    },
    watchOptions: {
        ignored: [
            '**/_data',
            '**/_doc',
            '**/_drafts',
            '**/_posts',
            '**/_projects',
            '**/node_modules',
            '**/doc',
            '**/test',
        ]
    },
};