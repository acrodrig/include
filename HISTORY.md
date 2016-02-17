0.2.0 / 2016-02-16
==================

- Full IE Compatibility (IE7+)
- Made documentation a little bit better (with image and link of visual tests)
- Stubbed `localStorage` if it is not present
- Replaced `Date.now()` for `(new Date()).getTime()` because of IE incompatibilities
- Stubbed `MutationObserver` so that it falls back on `onreadystate` first and `onload` second
- Made use of `XMLHttpRequest` retro-compatible via use of `readyState`


0.1.0 / 2016-02-03
==================

- Initial release
