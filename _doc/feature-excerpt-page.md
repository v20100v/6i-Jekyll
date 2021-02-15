6i-Jekyll
=========

## Feature : Add excerpt in a post

You can access a snippet of a posts’s content by using excerpt variable on a post. 

By default this is the first paragraph of content in the post, however it can be customized by setting a excerpt_separator variable in front matter or `_config.yml`. We choose to configure all posts with this excerpt separator : `excerpt_separator: <!--more-->`. So we don’t need to put it in front matter.

For example

```yaml
---
layout: post
title: Basic writing in Jekyll
tags: [Markdown, Jekyll]
author: v20100v
---
 
> Jekyll support Markdown, and inline HTML tags. It use [Kramdown](https://kramdown.gettalong.org/) as default Markdown renderer, and support for parsing and converting a superset of Markdown, and various extensions.
> <br><br>
> Some use cases of basic writing follows.

<!--more-->

## Headings

To create a heading, add one to six # symbols before your heading text. The number of # you use will determine the size of the heading.
(...)
```

<br>

Back to [README](../README.md).