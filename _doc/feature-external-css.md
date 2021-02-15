6i-Jekyll
=========

## Add external CSS into a Jekyll layout, or page

It's easy to add external CSS styles into a layout or a page in 6i theme. To do it, just use custom variable `styles` in YAML front matter. It's an array of string, or an array of style object.

You can use in front matter of a layout or a page.

Only one entry (with same name) is adding into DOM, and this even if an entry is added at the same time in a layout and in the page that uses this layout. The system detects and avoids duplicates in final DOM.

### Exemple with array of string 

```
./_layout/page.html
---
layout: default
styles: [https://foo.com/external-style.css', https://bar.com/another-style.css']
---

{{ content }}
```

### Exemple with array of style object

With style object syntax, it allows to add two more parameters in DOM for CSS style : `integrity` and `crossorigin`. Like this :

```
./_layout/page.html

---
layout: default
styles:
    - href: 'https://foo.com/external-style.css'
      integrity: 'sha512-vswe+cgvic/XBoF1Oc'
      crossorigin: 'anonymous'
    - href: https://bar.com/another-style.css'
      integrity: 'sha512-cbQXwDFK7lj2Fqfkzz'
      crossorigin: 'anonymous'
---

{{ content }}
```

## Take a look under the hood

See the Liquid element `./_includes/head/styles.html`.

```
// ./includes/head/styles.html

<!-- Link all styles declared in front matter 'styles' of a layout or page -->
{%- assign styles = '' | split: '' -%}
{%- if layout.styles -%}
    {%- assign styles = styles | concat: layout.styles -%}
{%- endif -%}
{%- if page.styles -%}
    {%- assign styles = styles | concat: page.styles -%}
{%- endif -%}
{%- assign styles = styles | uniq -%}

{%- if styles.size > 0 -%}
    {%- for style in styles -%}
        {%- if style.first -%}
            <link rel="stylesheet"
                  href="{{ style.href }}"
                  {%- if style.integrity -%} integrity="{{ style.integrity }}"{%- endif -%}
                  {%- if style.crossorigin -%} crossorigin="{{ style.crossorigin }}"{%- endif -%}/>
        {%- else -%}
            <link rel="stylesheet" href="{{ style }}" />
        {%- endif -%}
    {%- endfor -%}
{%- endif -%}
```


<br>

Back to [README](../README.md).