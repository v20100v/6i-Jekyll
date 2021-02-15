6i-Jekyll
=========

## Feature : Tags of a page

### Add one or more tags in a page
Each page, post, or collection's page like project can have one or more tags, and allows to build a taxonomy. We define tags in YAML front matter of page as an array. Separate each tag with a comma. 

For example :

```yaml
---
layout: post
title: In tartiflette we trust !
tags: [gastronomy, recipe]
---
```

We recommend using simple tags, always written with the same case ; although the system is case insensitive. In the case of a tag with several words, we recommend to separate each word with a "-", like : `tags: [application-destkop, application-web]`.

### List all tags in Jekyll site

All the tags will be listed in a summary page (tags.html). For each tag, we build the list of pages that refer to it, and sort by publication date.

<br>

Back to [README](../README.md).