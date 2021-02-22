6i-Jekyll
=========

## 6i-Jekyll console commands

In order to make contribution, development and deployment of a Jekyll web site easier, we provide console commands built in [Node.js](https://nodejs.org/en/) ecosystem wit [Yarn](https://classic.yarnpkg.com/en/). You can see its in `scripts` property of  `package.json` file.

To work with console commands, you must install node.js and all dependencies defined in package.json. If not, to install all the dependencies of project, use : 

```
yarn install
```

### Main console commands

| Main commands | Description |
|---------------|-------------|
| `yarn dev` | One command to rule them all for serve site in development. With this command Webpack, and Jekyll runs in parallel with **watch** & **livereload** mode.<br><br>1. At the begining we clean Jekyll environement (`yarn jekyll:clean`)<br>2. Build assets with webpack in watch mode (`yarn webpack:watch`)<br>3. Build Jekyll website in watch & livereload mode, and serve it locally in http://localhost:20100 (`yarn jekyll:serve`)<br>4. Open static website in browser automatically (with `--open-url` option) |
| `yarn build` | Build site to production.<br><br>1. Build assets webpack (`yarn webpack:build`) <br>2. Build Jekyll site (`yarn jekyll:build`)<br>3. And build 6i-jekyll gem (`yarn gem:build`) |
| `yarn publish` | Build site to production, and after publish it in Github Pages. Push modification on remote branch `gh-pages` on GitHub, depends on the git remote origin of your project.<br><br> To add a git origin remote, if it is not done yet, just use this command on the terminal `git remote add origin https://github.com/user/yout-depot.git` with your url. [More info here](https://docs.github.com/en/github/using-git/adding-a-remote).

### Secondary console commands

| Secondary commands | Description |
|--------------------|-------------|
| `yarn jekyll:clean` | Remove all generated files of Jekyll site. Delete all files in `_sites` folder, and remove all Jekyll caches.|
| `yarn jekyll:serve` | Build Jekyll website any time a source file changes, and serve it locally on `port=20100` with livereload. |
| `yarn jekyll:build` | Performs a one off build your Jekyll site to output folder `./_site`. Environment variables `NODE_ENV` and `JEKYLL_ENV` are set to `production` in this case. |
| `yarn webpack:watch` | Build assets webpack and watch for files changes. |
| `yarn webpack:build` | Run webpack in production environment to build assets. The environment variable `NODE_ENV` is set to `production` in this case.  |
| `yarn gem:build` | Build the 6i-Jekyll gem. Read its specifications in `6i-jekyll.gemspec`.|
| `yarn push-github-pages` | Publish Jekyll site to Github page, i.e. into a `gh-pages` branch on GitHub. <br><br>Calling this command will create a temporary clone of the current repository, create a `gh-pages` branch if one doesn't already exist, copy over all files from the base path, or only those that match patterns from the optional src configuration, commit all changes, and push to the origin remote.<br><br>If a `gh-pages` branch already exists, it will be updated with all commits from the remote before adding any commits from the provided src files. Note that any files in the gh-pages branch that are not in the src files will be removed. See the add option if you don't want any of the existing files removed.  |


<br>

Back to [README](../README.md).