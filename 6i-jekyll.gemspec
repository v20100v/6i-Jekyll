# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "6i-jekyll"
  spec.version       = "1.0.0"
  spec.authors       = ["v20100v"]
  spec.email         = ["vb20100bv@gmail.com"]
  spec.summary       = "A free and open-source Jekyll theme for IT blog & portfolio."
  spec.homepage      = "https://v20100v.github.io/projects/6i-jekyll"
  spec.license       = "MIT"
  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.post_install_message =  <<~MSG
                               Thanks for using 6i theme Jekyll !
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
