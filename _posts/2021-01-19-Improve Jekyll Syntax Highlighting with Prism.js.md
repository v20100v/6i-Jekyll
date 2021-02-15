---
layout: post
title: "Improve Jekyll Syntax Highlighting with Prism.js"
author: v20100v
categories: dev
tags: [markdown, jekyll]
image:
    path: "assets/images/hero/computer.jpeg"
    thumbnail: "assets/images/hero/computer.jpeg"
---

> Syntax Highlighting is a feature that displays source code. 
This feature facilitates writing in a structured language such as a programming language or a markup language as it makes import things visually distinct.
> <br><br>
> By default Jekyll, ships with [Rouge](http://rouge.jneen.net/) engine syntax highlighter. You can change it with another like [Prism.js](https://prismjs.com/), a very lightweight JavaScript library to provide code highlighting on websites with more features and supported languages.

<!--more-->

## Change the syntax highlighter **Rouge** to **Prism.js** in Jekyll

### Why change ?

- Dead simple : Use proper HTML5 code tags in DOM.
- Performance : The core is 2KB minified & gzipped. Languages add 0.3-0.5KB each, themes are around 1KB. Supports parallelism with Web Workers, if available.
- Easy syling : All style is done through CSS with sensible class names (.comment, .string, .property...).
- More languages supported (like AutoIt), and supply an extensible model to define new languages.


### How change it in Jekyll ?

#### Disable Rouge, the native syntax highlighter in Jekyll

First, we need to disable the Rouge syntax highlighter in Jekyll configuration. Open the `_config.yml` file located at the root directory of your Jekyll website, and add the following line:
   
```yaml
highlighter: none
```
   
Be aware if you used a Jekyll webiste hosted on Github Pages. In this case, we need some hack in configuraiton to disable it, by adding the folowing lines:
   
```yaml
markdown: kramdown
kramdown:
   syntax_highlighter_opts:
      disable : true
```

#### Install Prism.js by adding this Javascript and CSS into DOM

Finaly add the library Prism.js by putting the javascript file and CSS. Remarks, you can use a CDN (https://cdnjs.com/libraries/prism), or download it manualy, or you can use a package manager like Yarn to install as a dependency's of project.

If we use the CDN, it's recommended to use the Prism.js [Autoloader](https://prismjs.com/plugins/autoloader/) plugin which automatically loads languages support when necessary.

```html
<html>
<head>
    (...)
    <link href="https://myCDN.com/prism@v1.x/themes/prism.css" rel="stylesheet" />
</head>
<body>
    (...)
    <script src="https://myCDN.com/prism@v1.x/components/prism-core.min.js"></script>
    <script src="https://myCDN.com/prism@v1.x/plugins/autoloader/prism-autoloader.min.js"></script>
</body>
</html>
```

## Use the syntax highlighter Prism.js

### Write GFM Code Blocks

The GitHub Flavored Markdown [fenced code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) are supported to write some code.

#### CSS example

```css
#container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
```

#### Ruby example

```ruby
#=> prints 'Hi, Tom' to STDOUT <=#
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
```

#### AutoIt example

```AutoIt
;; ./view/View_Welcome.au3 ;;
Func _GUI_HandleEvents_View_Welcome($msg)
   Switch $msg
      ; Trigger for click on $image_banner
      Case $label_welcome
         ConsoleWrite('Click on "$label_welcome"' & @CRLF)
      ; Add another trigger in view 'Welcome' here
   EndSwitch
EndFunc
```

#### HTML example

In order to write some HTML in markdown without interpretation, we must encapsulated your code with `{{ "{% raw " }}%}<div>HTML code</div>{{ "{% endraw " }}%}` liquid tag. The [raw filter](https://shopify.github.io/liquid/tags/raw/) temporarily disables tag processing.

```html
{% raw %}<nav class="pagination" role="navigation">
  {% if page.previous %}
    <a href="{{ site.url }}{{ page.previous.url }}" class="btn" title="{{ page.previous.title }}">Previous article</a>
  {% endif %}
  {% if page.next %}
    <a href="{{ site.url }}{{ page.next.url }}" class="btn" title="{{ page.next.title }}">Next article</a>
  {% endif %}
</nav>{% endraw %}
```

#### Add line number at the beginning of code lines.

In order to add line numbers into code section, we use the plugin [line-numbers](https://prismjs.com/plugins/line-numbers/). To enable it on a GFM, just add `{: class="line-numbers"}` after the declaration. 

```css
.highlight {
  margin: 0;
  padding: 1em;
  line-height: 1.8;
}
```
{: class="line-numbers"}

And to change the number of start, just add `{: class="line-numbers" data-start="20"}` after the declaration.

```css
.highlight {
  margin: 0;
  padding: 1em;
}
```
{: class="line-numbers" data-start="20"}

#### Add support to soft wrap

And finaly to support multiline line numbers using soft wrap, apply the CSS `white-space: pre-line;` or `white-space: pre-wrap;` to your desired.

```html
<section class="language-markup">
  <h1>How to use</h1>

  <p>Obviously, this is supposed to work only for code blocks and not for inline code.</p>
  <p>Add the <code>line-numbers</code> class to your desired <code>&lt;pre></code> or any of its ancestors, and the Line Numbers plugin will take care of the rest. To give all code blocks line numbers, add the <code>line-numbers</code> class to the <code>&lt;body></code> of the page. This is part of a general activation mechanism where adding the <code>line-numbers</code> (or <code>no-line-numbers</code>) class to any element will enable (or disable) the Line Numbers plugin for all code blocks in that element. <br> Example:</p>
```
{: class="line-numbers" style="white-space:pre-wrap;"}

#### Write code blocks in lists

Indentation matters. Be sure the indent of the code block aligns with the first non-space character after the list item marker (e.g., `1.`). Usually this will mean indenting 3 spaces instead of 4.

1. Do step 1.
2. Now do this:

   ```ruby
   def print_hi(name)
     puts "Hi, #{name}"
   end
   print_hi('Tom')
   #=> prints 'Hi, Tom' to STDOUT.
   ```
        
3. Now you can do this.

### Support GitHub Gist embed

An example of a Gist embed, just write into the markdown:

```js
<script src="https://gist.github.com/fabpot/bad2044f8b7fb7c25860793f251a96b6.js"></script>
```

And the result is :

<script src="https://gist.github.com/fabpot/bad2044f8b7fb7c25860793f251a96b6.js"></script>

### Support Geojson in GitHub Gist embed

<script src="https://gist.github.com/AliceTheGitHubber/38268bacd4590433b6e0c3b58c6158dc.js"></script>