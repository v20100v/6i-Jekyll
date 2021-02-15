---
layout: post
title: 'Feature : sample post with hero image'
tags: [Jekyll]
author: v20100v
image:
    path: assets/images/hero/Dziana-Hasanbekava.jpeg 
    credits: pexels.com
---

> A sample post with title, and hero image, *i.e.* a large web banner image placed in the header of web page.

<!--more-->

# How to do add a hero image in a post ?

In the YAML front matter of your post, you just put the variable `image`, directly fill with a relative path in a string.

```yaml
image: "assets/images/hero/open.jpg"
```

Or you can pass an object with a `path` variable, and optionally `thumbnail` and `caption` variable.

```yaml
image:
    path: "assets/images/hero/open.jpg"
    thumbnail: "assets/images/hero/open.jpg"
    caption: "Photo from AdobeStock id 349298204"
    
```

