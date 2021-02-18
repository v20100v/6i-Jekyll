# 6i Jekyll theme 

> A free and open-source [Jekyll](https://jekyllrb.com/) theme for IT blog & portfolio.
>  
> ⚠️Please note that this theme is **NOT** supported by GitHub pages. You need to generate your static site and push it to to your repository Github. 6i-Jekyll-Theme provides command to publish site on Github easily.

## Notables features

- IT projects Portfolio, with two types of views (as a grid or as a list) and with filters on projects.
- Tags in page, and see all the tags will be listed in a summary page.
- Fully responsive design for all devices.
- Improve syntax highlighting with [Prism.js](https://prismjs.com/)     
- Provides console commands to make easier development using Jekyll and [Webpack](https://webpack.js.org/) with watch & livereload mode ; and the publication on Github pages of a Jekyll site.
- Support of Yarn in order to manage dependencies for front-end and development tools with in Node.js ecosystem.
- Support of [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) 5 with Sass, in order to customize implementation.
- Support of [Webpack](https://webpack.js.org/) 5 for bundling Javascript (ES6) and assets of this jekyll site.
- Support of [Font Awesome 5](https://fontawesome.com/) for icon library and toolkit.
- Pagination generator for Jekyll ([jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2)) ;
- Generate a sitemaps.org compliant sitemap for your site ([jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap)) ;
- Generate an Atom feed for your site ([jekyll-feed](https://github.com/jekyll/jekyll-feed));
- Generate metadatas tags for search engines and social networks ([jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag)) ;
- Email protection by obfuscation of mailto links ([jekyll-email-protect](https://github.com/vwochnik/jekyll-email-protect)) ;
- Rendering cache of Liquid includes for better experience ([jekyll-include-cache](https://github.com/benbalter/jekyll-include-cache)) ;
- Provides "*Follow me*" & "*Social share*" buttons in footer. Easy to configure and to add new providers. Works with : Github, Twitter, Facebook, Linkedin.
  

---

## Installation

### For simple usage with Gem based method

With Gem based themes, directories such as the assets, _layouts, _includes, and _sass are stored in the theme’s gem, hidden from your immediate view. Yet all of the necessary directories will be read and processed during Jekyll’s build process. This allows for easier installation and updating as you don't have to manage any of the theme files. 

<u>To install :</u>

1. Add the following into your Gemfile : `gem "6i-jekyll"`
2. Fetch and update bundled gems by running : `bundle install`
3. Set the theme in your project's Jekyll `_config.yml` with : `theme: 6i-jekyll`
4. Then install development tools dependencies in Node.js ecosystem : `yarn install`. This dependencies are described in `package.json`, and install in `node_modules` folder.
   
<u>To update :</u>

1. Run `bundle update`.

<u>To write a new post/page and serve it locally :</u>

1. Run `yarn dev:jekyll` to start a localy server and Jekyll compilation with watch mode.
2. Create a new content in `_posts` or a new page. Jekyll
3. Open browser in `http://localhost:4000`.

<u>To publish changement in Github Page</u>

1. No support given with Github pages remote theme, you need to generate your site and push it to your repository Github pages.
2. Configure git for your project `git init`, and don't forget to add the default remote Github repository git. By convention, it's called *origin*. `git remote add origin https://github.com/user/yout-depot.git`. Change git url with yours.
2. Run `yarn publish`

### For simple usage by forking/copying

You also can fork this project, or directly copying all of the them files into your project, except for the `node_modules` directory. To deals with Webpack assets you must install dependencies for front-end and development tools in Node.js ecosystem with : `yarn install`. See bellow chapter : *For development*.

### For development

To set up your environment to develop this theme, 

1. Run Bundler to install and make sure all dependencies un Gemfile project are available : `bundle install`.
2. Then install dependencies for front-end and development tools in Node.js ecosystem : `yarn install`. This dependencies are described in `package.json`, and install in `node_modules` folder.
3. Finally run `yarn dev` to start in parallel localy server, Jekyll & Webpack compilation.

Theme is setup just like a normal Jekyll site, so to test it you wan use native Jekyll command `bundle exec jekyll serve`, and open manually your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal. But all assets are handling with Webpack. So we also need to launch in another terminal compilation in Webpack with watch mode by using : `webpack --mode development --watch`.

It's boring to launch many commands to do it. We recommend to use only `yarn dev`. One command to rule them all ! 

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled. To add a custom directory to your theme-gem, please edit the regexp in `6i.gemspec` accordingly.

Finally to push gem

1. Generate gem with `gem build 6i-jekyll.gemspec`
2. And push it on RubgyGems.org `gem push 6i-jekyll-x.y.z.gem=`

## Structure theme

```
6i-Jekyll-theme
├── _data                       # Custom data inject in Liquid template system
|  └── webpackstats.json        # List of all assets paths with hash, generated by webpack
├── _doc                        # Theme documentations
├── _includes                   # Theme liquid elements and functions 
├── _layouts                    # Theme layouts
├── _drafts                     # Drafts are posts, not published yet
├── _posts                      # Blog
├── _projects	                # IT projects portfolio
├── _site                       # Jekyll output, i.e. static website
├── _webpack                    # Webpack content 
|  ├── fonts                    # Theme web fonts (*.ttf)
|  ├── images                   # Theme images source
|  ├── js                       # Theme javascript
|  ├── scss                     # Theme styles (scss)
|  └── static                   # Theme static files
|    ├── .no-jekyll             # To bypass Jekyll processing on Github Pages
|    └── favicon.ico            # Default favicon theme
├── assets                      # Theme assets
|  ├── build	                # Webpack output 
|  └── images                   # Theme images preprocessed
├── node_modules                # Installed Node.js dependencies
├── pages                       # Theme pages
|   ├── 404.md                  # Not found page
|   ├── notes.md                # Blog to show post pages
|   ├── projects.md             # Portfolio page for IT projects
|   └── tags.md                 # List all tags in webiste with related pages
├── .gitignore                  # sample configuration
├── _config.yml                 # Sample Jekyll configuration
├── Gemfile
├── package.json                # Node.js front & tools dependencies
├── postcss.config.js           # Configuration for PostCSS (autoprefixer, precss...)
├── webpack.config.js           # Configuration for Webpack
└── index.html                  # Home page
```

## Usages

### Configuration

- [Configure : Site configuration]()
- [Configure : "*Follow me*" & "*Social share*" buttons in footer](_doc/configure-footer-social.md)

### Features on layout and page

- [Feature : Tags of a page](_doc/feature-tags-page.md)
- [Feature : Add hero image on a page](_doc/feature-hero-image.md)
- [Feature : Add excerpt in a post](_doc/feature-excerpt-page.md)
- [Feature : Use syntax highlighter Prism.js in Jekyll](_doc/feature-syntax-highlighter-prism.js.md)
- [Feature : Add external CSS into a Jekyll layout, or page](_doc/feature-external-css.md)
- [Feature : Add references of webpack CSS and Javascript into a Jekyll layout, or page](_doc/feature-webpack-layout-page.md)

### 6i-Jekyll console commands
In order to make contribution, development and deployment of a Jekyll web site easier, we provide console commands built in [Node.js](https://nodejs.org/en/) ecosystem wit [Yarn](https://classic.yarnpkg.com/en/). You can see its in `scripts` property of  `package.json` file.

[Feature : 6i-Jekyll-Theme console commands for easy serve Jekyll site with webpack, build and publish on Github pages](_doc/feature-6i-jekyll-console-commands.md)


## About

### Release history

- 6i Jekyll Theme v1.0.0-alpha - 11/02/2021

### Contributing

Bug reports, comments, pull-request & Github stars are always welcome !

### License

Copyright (c) 2018 by v20100v. 

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).


