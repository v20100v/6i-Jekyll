6i-Jekyll
=========

## Add references of webpack CSS and Javascript into a Jekyll layout or page

### Front matter custom variables provides

Imagine two entries into your Webpack configuration : `main` and `consologo`. The main entry is related to a Javascript and to Sass file. The consologo is related only to a Javascript file.

```js
// ./webpack.config.js

module.exports = {
    entry: {
        main: path.join(webpackSource, 'js', 'main.js'),
        consologo: path.join(webpackSource, 'js', 'consologo.js'),
    }
    (...)
};
```

It's easy to add entries Javascript or CSS reference into a Jekyll layout or a page in 6i theme. To do it, just use custom variables in YAML front matter :

- `webpack_entry_scripts` to add javascript (webpack entry) into layout
- `webpack_entry_styles` to add CSS (webpack entry) into layout.

```html
// ./_layouts/default.html

---
webpack_entry_scripts: ['main', 'consologo']
webpack_entry_styles: ['main']
---
<!doctype html>
<html lang="{{ page.locale | default: site.locale | default: 'en' }}">
<head>
    {% include head/styles.html %}
</head>
<body>
<div id="main-container">
    {{ content }}
</div>
{% include footer/javascripts.html %}
</html>
```

- All Webpack CSS styles are automatically placed into tag `<head>`. It's done into Liquid element `{% include head/styles.html %}`
- All Webpack Javascript are automatically placed at the end of `<head>`. It's done into Liquid element `{% include footer/javascripts.html %}`

### Detects and avoid duplicates entries into DOM

Only one entry (with same name) is adding into DOM, and this even if an entry is added at the same time in a layout and in the page that uses this layout. The system detects and avoids duplicates. 

```
// ./_posts/2018-05-17-sample-post.md
---
layout: post
title: 'Sample post'
tags: [Jekyll]
author: v20100v
webpack_entry_scripts: ['consologo']
---

A sample post
```

 In this example 2018-05-17-sample-post.md, the script `consologo` is added only once in the DOM, although it is present in the top level default layout, and in the page.

### No problem with webpack hash use in cache busting

By using the custom variables `webpack_entry_scripts` and `webpack_entry_styles` you don't have to worry about the hash problem in the file name. This hash is adding by Webpack for cache busting. It is automatically managed by 6i-jekyll-theme.


## Take a look under the hood

### Webpack cache busting ?

When a static file gets cached it can be stored for very long periods of time before it ends up expiring. This can be an annoyance in the event that you make an update to a site however, since the cached version of the file is stored in your visitors' browsers, they may be unable to see the changes made.

So, in order to invalidate all caching on web, it is usual to include a hash into filename of assets, aka *cache busting method*. Cache busting is useful because it allows your visitors to receive the most recently updated files without having to perform a hard refresh or clear their browser cache, and intermediates proxies cache. From a developer's point of view, using cache busting is beneficial so that the latest changes can be pushed out and become available to everyone immediately.

With webpack, we can implement cache busting in production, by including a hash into filename of all assets. 

For example :

```
+---source
|       consologo.js
|       main.js
```
```
+---build
|       consologo.1384e46c609e58efa48d.bundle.js
|       main.4f0009f648be29221a4a.bundle.js
```

It's not a good idea to use hash or contenthash during development, it's preferable to use it only for production.

See https://webpack.js.org/guides/caching/

### Webpack placeholders

Webpack provides placeholders, there are used to attach specific information to webpack output. The filename of asset can use these placeholders :

- `[id]` - Returns the chunk id.
- `[path]` - Returns the file path.
- `[name]` - Returns the file name.
- `[ext]` - Returns the extension. [ext] works for most available fields.
- `[fullhash]` - Returns the build hash. If any portion of the build changes, this changes as well.
- `[chunkhash]` - Returns an entry chunk-specific hash. Each entry defined in the configuration receives a hash of its own. If any portion of the entry changes, the hash will change as well. [chunkhash] is more granular than [fullhash] by definition.
- `[contenthash]` - Returns a hash generated based on content. It's the new default in production mode starting from webpack 5.

```js
const EnvironmentDev = process.env.NODE_ENV !== 'production';
const webpackSource = path.join(__dirname);
const webpackOutput = path.join(webpackSource, 'build');

module.exports = {
    entry: {
        main: path.join(webpackSource, 'js', 'main.js'),
        consologo: path.join(webpackSource, 'js', 'consologo.js')
    },
    output: {
        filename: EnvironmentDev ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
        path: path.join(webpackOutput)
    },

    (...)
};
```

Webpack generates filenames like these based on it:

```
consologo.1384e46c609e58efa48d.bundle.js
main.4f0009f648be29221a4a.bundle.js
```

It seems to be a good pratices to attache the hash into the filename. It's the most performant option in cache busting method, compare to approach with querystring asset (`main.js?4f0009f648be29221a4a`).


### Generate a JSON file that contains the list of all assets paths with hash into _data Jekyll folder

In Webpack ecosystem, we use the plugin [assets-webpack-plugin](https://github.com/ztoben/assets-webpack-plugin) to produces the file `webpackstats.json` in `_data` folder. It's a Jekyll conventional folder use to store additional data to use when generating the static site.

With this plugin, we have ability to parse the webpack stats object, process / transform the object and write out to a file for further consumption. At the end of process, it generates a json file with hash map of all build files.

```js
// ./webpack.config.js

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
        consologo: path.join(webpackSource, 'js', 'consologo.js')
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
        rules: (...)
    }
};
```

Example of result after build Webpack :

```json
// ./_data/webpackstats.json

{
  "main": {
    "css": "main.bc0119169e1ba5b79060.css",
    "js": "main.e0bddf45f7ee29f84352.bundle.js"
  },
  "consologo": {
    "js": "consologo.7bf7951e797887cb02c3.bundle.js"
  },
  "projects": {
    "css": "projects.2f8ad18bbb592633c1ff.css",
    "js": "projects.55ccfa2af386b06a5edc.bundle.js"
  },
  "page": {
    "css": "page.e57f04fa8c55c858874b.css",
    "js": "page.ced8a65c4d59bd3aba77.bundle.js"
  }
}
```

### How are Webpack CSS styles added in front matter ?

To add all webpack CSS styles set in `webpack_entry_styles` with correct hash, we read the previous `./_data/webpackstats.json` generated by Webpack, in the Liquid element `./_includes/head/styles.html`.

```liquid
// ./includes/head/styles.html

<!-- Assign array with webpack entry styles provide from layout or page front matter -->
{%- assign webpack_entry_styles = '' | split: '' -%}
{%- if layout.webpack_entry_styles -%}
    {%- assign webpack_entry_styles = webpack_entry_styles | concat: layout.webpack_entry_styles -%}
{%- endif -%}
{%- if page.webpack_entry_styles -%}
    {%- assign webpack_entry_styles = webpack_entry_styles | concat: page.webpack_entry_styles -%}
{%- endif -%}
{%- assign webpack_entry_styles = webpack_entry_styles | uniq -%}

<!-- Insert webpack CSS style with contenthash by parsing webpackstats.json -->
{%- assign webpackstats = site.data.webpackstats -%}
{%- if webpack_entry_styles.size > 0 -%}
    {%- for webpack_entry_style in webpack_entry_styles -%}
        {%- assign asset = webpackstats[webpack_entry_style]['css'] -%}
        <link rel="stylesheet" href="/assets/build/{{ asset | prepend: site.baseurl}}" />
    {% endfor %}
{%- endif -%}
```

### How are Webpack Javascript added in front matter ?

Do the same thing to add all webpack Javascript set in `webpack_entry_scripts` with correct hash, we read the previous `./_data/webpackstats.json` generated by Webpack, in the Liquid element `./_includes/footer/javascripts.html`.

```liquid
// ./_includes/footer/javascripts.html

<!-- Assign array with webpack entry scripts provide from layout or page front matter -->
{%- assign webpack_entry_scripts = '' | split: '' -%}
{%- if layout.webpack_entry_scripts -%}
    {%- assign webpack_entry_scripts = webpack_entry_scripts | concat: layout.webpack_entry_scripts -%}
{%- endif -%}
{%- if page.webpack_entry_scripts -%}
    {%- assign webpack_entry_scripts = webpack_entry_scripts | concat: page.webpack_entry_scripts -%}
{%- endif -%}
{%- assign webpack_entry_scripts = webpack_entry_scripts | uniq -%}

<!-- Insert webpack javascript with contenthash by parsing webpackstats.json -->
{%- assign webpackstats = site.data.webpackstats -%}
{%- if webpack_entry_scripts.size > 0 -%}
    {%- for webpack_entry_script in webpack_entry_scripts -%}
        {%- assign asset = webpackstats[webpack_entry_script]['js'] -%}
        <script type="text/javascript" src="/assets/build/{{ asset }}" async></script>
    {% endfor %}
{% endif %}
```

<br>

Back to [README](../README.md).