---
layout: post
title: Basic writing in Jekyll
categories: [dev]
tags: [Markdown, Jekyll]
author: v20100v
---
 
> Jekyll support Markdown, and inline HTML tags. It use [Kramdown](https://kramdown.gettalong.org/) as default Markdown renderer, and support for parsing and converting a superset of Markdown, and various extensions.
> <br><br>
> Some use cases of basic writing follows.

<!--more-->

## Headings

To create a heading, add one to six # symbols before your heading text. The number of # you use will determine the size of the heading.

```markdown
# The largest heading
## The second largest heading
###### The smallest heading
```

# Title

## Subtitle

Praesent a hendrerit quam. Nunc et lacus sit amet orci tempor vehicula. In ac sem vitae lorem molestie ultricies. Donec feugiat egestas ligula, eu luctus est rutrum ac. Aenean rutrum non massa eget hendrerit.

### Subtitle header three

Etiam nec lorem vitae neque dignissim tempus. Curabitur massa tellus, aliquam sit amet neque a, mattis auctor tellus.

#### Subtitle header four

Nullam lectus ligula, auctor at dui vel, cursus viverra tellus. Etiam pellentesque ut urna quis blandit. Maecenas eu interdum turpis, nec mollis massa.

##### Subtitle header five

Vivamus semper pulvinar nibh ornare facilisis. In varius velit a augue eleifend accumsan. Cras varius ipsum a dui ornare tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti.

###### Subtitle header six

Cras at leo orci. Sed maximus augue turpis, in hendrerit dolor cursus sit amet. Proin nec auctor eros. Morbi a elit nisl.


## Basic styling text

You can indicate emphasis with bold, italic, or strikethrough text.

| Style | Syntax | Result |
|-------|--------|--------|
| Italic | `*This text is italicized*` | *This text is italicized* |
| Bold	| `**This is bold text**`	| **This is bold text** |
| Strikethrough | `~~This was mistaken text~~` | ~~This was mistaken text~~ |
| Bold and nested italic | `**This text is _extremely_ important**` | **This text is _extremely_ important** |
| Bold and italic | `***All this text is important***` | ***All this text is important***


## Links

| Element | Syntax | Result |
|-------|--------|--------|
| Link | `[GitHub Pages](https://pages.github.com/)` | [GitHub Pages](https://pages.github.com/)
| Relative link | `[Show updates](docs/UPDATES.md)` | [Show updates](docs/UPDATES.md)
| Anchor link | `[Go to "Headings"](#headings)` | [Go to "Headings"](#headings)


## Images

The syntax to add image is : `![Alt Text](url)`

![2080 My Megadrive](https://www.bewaremag.com/wp-content/uploads/2011/10/megadrive-800x440.png.webp)


## Quoting text

You can quote text with a `> In tartiflette, we trust !`, and we obtains:

> In tartiflette, we trust !

A multi line blockquote in italic with a cite reference in footer.

> *People think focus means saying yes to the thing you've got to focus on. But that's not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I'm actually as proud of the things we haven't done as the things I have done. Innovation is saying no to 1,000 things*.
>
> <footer><strong>Steve Jobs</strong> &mdash; Apple Worldwide Developers' Conference, 1997</footer>

Blockquotes can contain other Markdown formatted elements, but not all elements can be used.

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.


## Lists

You can organize items into ordered and unordered lists.


### Unordered Lists

To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items. Indent one or more items to create a nested list.

* List item one
  * List item one
    * List item one
    * List item two
    * List item three
    * List item four
  * List item two
  * List item three
  * List item four
* List item two


### Ordered List

To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical order, but the list should start with the number one.

1. List item one
    1. List item one
        1. List item one
        2. List item two
        3. List item three
        4. List item four
    2. List item two
    3. List item three
    4. List item four
2. List item two


### Task lists

To create a task list, preface list items with a regular space character followed by [ ]. To mark a task as complete, use [x].

- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request

If a task list item description begins with a parenthesis, you'll need to escape it with `\`.

- [ ] \(Optional) Open a followup issue


### Definition lists

Some Markdown processors allow you to create definition lists of terms and their corresponding definitions. To create a definition list, type the term on the first line. On the next line, type a colon followed by a space and the definition.

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.


## Tables

To add a table, use three or more hyphens to create each column’s header, and use pipes (&#124;) to separate each column. You can optionally add pipes on either end of the table.

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |


### Add style with CSS bootstrap classes

You can add some CSS classes with putting this code `{: class="table table-dark table-striped"}` after the table's declaration.

| Employee         | Salary |                                                              |
|------------------|--------|--------------------------------------------------------------|
| [John Doe](#)    | $1     | Because that's all Steve Jobs needed for a salary.           |
| [Jane Doe](#)    | $100K  | For all the blogging she does.                               |
| [Fred Bloggs](#) | $100M  | Pictures are worth a thousand words, right? So Jane × 1,000. |
| [Jane Bloggs](#) | $100B  | With hair like that?! Enough said.                           |
{: class="table table-dark table-striped"}

Another example with `{: class="table table-borderless table-striped table-hover"}`.

| Employee         | Salary |                                                              |
|------------------|--------|--------------------------------------------------------------|
| [John Doe](#)    | $1     | Because that's all Steve Jobs needed for a salary.           |
| [Jane Doe](#)    | $100K  | For all the blogging she does.                               |
| [Fred Bloggs](#) | $100M  | Pictures are worth a thousand words, right? So Jane × 1,000. |
| [Jane Bloggs](#) | $100B  | With hair like that?! Enough said.                           |
{: class="table table-borderless table-striped table-hover"}


## HTML elements

#### Address

```html
<address>
    1 Infinite Loop<br /> Cupertino, CA 95014<br /> United States
</address>
``` 

The result is:

<address>
    1 Infinite Loop<br /> Cupertino, CA 95014<br /> United States
</address>

#### Abbreviation

```markdown
*[CSS]: Cascading Style Sheets
```
The result is:

The abbreviation CSS stands for "Cascading Style Sheets".
*[CSS]: Cascading Style Sheets

#### Cite

```markdown
"In tartiflette we trust !" ---<cite>20100</cite>
```
The result is:

"In tartiflette we trust !" ---<cite>20100</cite>

#### Quote

```markdown
<q>Developers, developers, developers&#8230;</q> ---Steve Ballmer
```
The result is:

<q>Developers, developers, developers&#8230;</q> ---Steve Ballmer

#### Inserted

```markdown
This element should denote <ins>inserted</ins> text.
```
The result is:

This element should denote <ins>inserted</ins> text.

#### Keyboard

```markdown
This scarcely known element emulates <kbd>keyboard</kbd>.
```
The result is:

This scarcely known element emulates <kbd>keyboard</kbd> text.

#### Subscript

```markdown
Getting our science styling on with H<sub>2</sub>O.
```
The result is:

Getting our science styling on with H<sub>2</sub>O.

#### Superscript

```markdown
Still sticking with science and Isaac Newton's E = MC<sup>2</sup>.
```
The result is:

Still sticking with science and Isaac Newton's E = MC<sup>2</sup>.

#### Variable

```markdown
This allows you to denote <var>variables</var>.
```
The result is:

This allows you to denote <var>variables</var>.

#### Code

You will learn later on in these tests that `word-wrap: break-word;` will be your best friend.

This element styles large blocks of code.

<pre>
.post-title {
	margin: 0 0 5px;
	font-weight: bold;
	font-size: 38px;
	line-height: 1.2;
	and here's a line of some really, really, really, really long text, just to see how the PRE element handles it and to find out how it overflows. Lorem ipsum sdfkjzle jf lkjsdlfj zejlsf eif sldkf zaêf sdf zemjsdf mlerrzr !;
}
</pre>
