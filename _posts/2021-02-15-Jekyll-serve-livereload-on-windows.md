---
layout: post
title: 'Fix error with `Jekyll serve livereload` on Windows due to EventMachine C extension'
tags: [Jekyll]
author: v20100v
---
<!--more-->

## Unable to load the EventMachine C extension with Jekyll livereload mode

On Windows 10, you can not use the livereload Jekyll without error on Event Machine C extension.

- see https://github.com/eventmachine/eventmachine/issues/820 ;
- see https://github.com/jekyll/jekyll/pull/8111 ;
- see https://httpain.com/blog/jekyll-live-reload-windows/


### Trace error 

```shellsession
> bundle exec jekyll serve --livereload

Configuration file: D:/6i/public/6i-jekyll/_config.yml
            Source: D:/6i/public/6i-jekyll
       Destination: D:/6i/public/6i-jekyll/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
         AutoPages: Disabled/Not configured in site.config.
        Pagination: Complete, processed 2 pagination page(s)
                    done in 0.67 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'D:/6i/public/6i-jekyll'
 Unable to load the EventMachine C extension; To use the pure-ruby reactor, require 'em/pure_ruby'
                    ------------------------------------------------
      Jekyll 4.2.0   Please append `--trace` to the `serve` command
                     for any additional information or backtrace.
                    ------------------------------------------------
Traceback (most recent call last):
        22: from C:/Ruby27-x64/bin/jekyll:23:in `<main>'
        21: from C:/Ruby27-x64/bin/jekyll:23:in `load'
        20: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/exe/jekyll:15:in `<top (required)>'
        19: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/mercenary-0.4.0/lib/mercenary.rb:21:in `program'
        18: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/mercenary-0.4.0/lib/mercenary/program.rb:44:in `go'
        17: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/mercenary-0.4.0/lib/mercenary/command.rb:221:in `execute'
        16: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/mercenary-0.4.0/lib/mercenary/command.rb:221:in `each'
        15: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/mercenary-0.4.0/lib/mercenary/command.rb:221:in `block in execute'
        14: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/commands/serve.rb:86:in `block (2 levels) in init_with_program'
        13: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/command.rb:91:in `process_with_graceful_fail'
        12: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/command.rb:91:in `each'
        11: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/command.rb:91:in `block in process_with_graceful_fail'
        10: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/commands/serve.rb:98:in `process'
         9: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/commands/serve.rb:143:in `register_reload_hooks'
         8: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/commands/serve.rb:143:in `require_relative'
         7: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/commands/serve/live_reload_reactor.rb:3:in `<top (required)>'
         6: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/jekyll-4.2.0/lib/jekyll/commands/serve/live_reload_reactor.rb:3:in `require'
         5: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/em-websocket-0.5.2/lib/em-websocket.rb:3:in `<top (required)>'
         4: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/em-websocket-0.5.2/lib/em-websocket.rb:3:in `require'
         3: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/eventmachine-1.2.7-x64-mingw32/lib/eventmachine.rb:8:in `<top (required)>'
         2: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/eventmachine-1.2.7-x64-mingw32/lib/eventmachine.rb:8:in `require'
         1: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/eventmachine-1.2.7-x64-mingw32/lib/rubyeventmachine.rb:2:in `<top (required)>'
         
error Command failed with exit code 1.
```

## How to fix it ?

1. Execute `gem uninstall eventmachine --force` and choose to uninstall eventmachine-1.2.7-x64-mingw32 gems from your system.
2. Edit `Gemfile` and add this line inside:
`gem 'eventmachine', '1.2.7', git: 'https://github.com/eventmachine/eventmachine.git', tag: 'v1.2.7'`
3. Execute `bundle install`, wait until the end of process
4. Clean up Jekyll cache with `bundle exec jekyll clean`
5. Launch Jekyll server with livereload, with `bundle exec jekyll serve --livereload` 
   
You can use `--livereload` parameter without getting any issue, even if you execute bundle install in future.
