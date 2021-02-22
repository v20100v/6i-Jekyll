# frozen_string_literal: true

# Get project metadatas from package.json
require 'json'
package = JSON.parse(File.open('package.json').read)

Gem::Specification.new do |spec|
  spec.name     = "6i-jekyll"
  spec.version  = package["version"]
  spec.authors  = "v20100v"
  spec.email    = package["author"]["email"]
  spec.summary  = package["description"]
  spec.homepage = package["homepage"]
  spec.license  = "MIT"

  spec.extra_rdoc_files = ["README.md"]
  spec.rdoc_options = ["--title", "6i Jekyll theme", "--main", "README.md"]

  # Files to include in this gem
  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(_(data|includes|layouts|webpack)|assets|pages|LICENSE|README|CHANGELOG|_config\.yml|\.no-jekyll|index.html|package.json|postcss.config.js|webpack.config.js)!i)
  end
  # The folder asset/builds is not git tracked, so we force to add it here.
  spec.files += Dir['assets/**/*']

  spec.post_install_message =  <<~MSG
                               Thanks for using 6i Jekyll !
                               MSG

  spec.metadata["plugin_type"] = "theme"

  spec.add_runtime_dependency "jekyll", "~> 4.1"
  spec.add_runtime_dependency "jekyll-paginate-v2", "~> 3.0"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.7"
  spec.add_runtime_dependency "jekyll-email-protect", "~> 1.1"
  spec.add_runtime_dependency "jekyll-include-cache", "~> 0.2"
  spec.add_runtime_dependency "jekyll-data", "~> 1.1"

  spec.add_development_dependency "bundler", "~> 2.1"
end
