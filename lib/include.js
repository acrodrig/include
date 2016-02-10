"use strict";

(function(exports) {

    function include(elem, url, depth) {
        // If depth is more than 10, something went awfully wrong, we better stop here
        if (depth > 10) return;

        url = url || elem.getAttribute("src");
        depth = depth || 0;

        var fn = function(html) {
            // Set HTML and then go looking for more `include` tags
            elem.innerHTML = html;

            // Evaluate scripts
            var scripts = elem.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                try { eval(scripts[i].innerHTML); }
                catch (ex) { console.log(url, "\n", ex); }
            }

            // Go down
            var includes = elem.getElementsByTagName("include");
            for (i = 0; i < includes.length; i++) include(includes[i], null, depth + 1);
       };

        // Check cache
        var html = localStorage[url], lastCached = 0;
        if (html) {
            lastCached = parseInt(html.substring(4));
            fn(html);
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.overrideMimeType("text/plain");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("If-Modified-Since", (new Date(lastCached)).toUTCString());
        xhr.onload = function(ev) {
            elem.setAttribute("status", xhr.status);
            var lastModified = (new Date(xhr.getResponseHeader("Last-Modified")).getTime());
            if (xhr.status < 400 && lastModified < lastCached) return;
            var html = "<!-- "+Date.now()+" -->\n"+xhr.responseText;
            fn(localStorage[url] = html);
        };
        xhr.send(null);
    }

    var observer = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var node = mutation.addedNodes[j];
                if (node.nodeType != Node.ELEMENT_NODE) continue;
                // console.log(node);
                if (node.nodeName.toLowerCase() != "include") continue;
                include(node);
            }
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    if (typeof(window) != "undefined") window.include = include;
    if (typeof(module) != "undefined") module.exports = include;

})(typeof(exports) == "undefined" ? this["include"] = { } : exports);
