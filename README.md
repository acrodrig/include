<img src="//acrodrig.github.io/include/filled_filter.svg" width="64"> Include JS
=============================================================================================================

A "new" tag for the web:

```html
<include src="/path/to/import/file.html"/>
```

The main reason why static generators (they are quite popular) need to exist in this day and age is the
lack of an HTML import facility. With current HTML you can include pretty much everything, except for HTML itself (pretty
lame IMHO).

[![demo](demo.png#screenshot)](test/demo.html)


## Table of Contents

- [Goals](#goals)
- [Why Include](#why-include)
- [Hello World Example](#hello-world-example)
- [Known Limitations](#known-limitations)
- [Testing Bind](#testing-bind)
- [Contributing](contributing)
- [License](license)


## Goals

The goals of this library are a completely seamless experience including content via the `<include>` tag. The experience
needs to be seamless in terms of:

- Simplicity: should work like a native tag
- Backward Compatibility: fails nicely in older browsers
- Speed: no screen flickering, fast load times (achieved via `localStorage` and pseudo-[pipelining](https://en.wikipedia.org/wiki/Instruction_pipelining))


## Why Include

- HTML import does not look like happening
- The `import` syntax is not declarative, it still needs Javascript to insert things into the page
- No more static generators for something as simple as an `include`
- Avoid all the performance penalties and flicker associated with dynamic includes (via smart caching)


## Hello World Example

Mandatory [Hello World](http://jsfiddle.net/acrodrig/e4o124g9/) example (link takes you to JSFiddle):

file `header.html`:

```html
<h1>ACME Inc</h1>
```

file `footer.html`:

```html
<footer>Copyright 2016</footer>
```

file `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script src="../lib/include.js"></script>
  </head>
  <body>
    <include src="header.html"></include>
    <article>
      <p>We are ACME Inc. We manufacture <b>everything</b>.</p>
    </article>
    <include src="footer.html"></include>
  </body>
</html>
```

The fiddle is modified to load the files directly from GitHub, since there is no way to store files as fiddles.


## Known Limitations

- At this point `include` cannot guard against infinite recursion


## Testing Include

There are three visual tests in the [`demo.html`](test/demo.html) file. Additionally you can see the results for
15 browser shots in the [`shots.html`](test/shots.html) file.


## Contributing

Do the usual GitHub fork and pull request dance. Add yourself to the
contributors section of [package.json] too if you want to.


## License

Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
