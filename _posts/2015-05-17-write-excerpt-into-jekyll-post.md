---
layout: post
title: "Write an excerpt into a Jekyll post"
tags: [6i-Jekyll]
author: v20100v
categories: dev
---

> A sample post with a title and an excerpt

<!--more-->

# How to do add an excerpt into post ?

You can access a snippet of a posts’s content by using excerpt variable on a post. By default this is the first paragraph of content in the post, however it can be customized by setting a excerpt_separator variable in front matter or `_config.yml`.

By default, we choose to configure all posts with this excerpt separator :

```yaml
excerpt_separator: <!--more-->
```

So we don't need to put it in front matter.
