# frozen_string_literal: true

# Get project metadatas from package.json
require 'json'
package = JSON.parse(File.open('package.json').read)

Gem::Specification.new do |spec|
  spec.name          = "6i-jekyll"
  spec.version       = package["version"]
  spec.authors       = "v20100v"
  spec.email         = package["author"]["email"]
  spec.summary       = package["description"]
  spec.homepage      = package["homepage"]
  spec.license       = package["license"]

  spec.extra_rdoc_files = ["README.md"]
  spec.rdoc_options = ["--title", "6i Jekyll theme", "--main", "README.md"]

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(_data|_includes|_layouts|assets|LICENSE|README|_config\.yml)!i) }

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
end
