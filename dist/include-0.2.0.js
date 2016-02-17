"use strict";

(function(exports) {

    // Mimic localStorage if it does not exists (old browsers)
    if (typeof(window.localStorage) == "undefined") window.localStorage = {};

    // Create include tag in old IE browsers
    // Per http://ajaxian.com/archives/getting-html-5-styles-in-ie-7
    if (window.attachEvent) document.createElement("include");

    function include(elem, url, depth) {
        depth = depth || 0;
        url = url || elem.getAttribute("src");

        // If depth is more than 10, something went awfully wrong, we better stop here
        if (depth > 10) return;

        var fn = function(html) {
            // Set HTML and then go looking for more `include` tags
            elem.innerHTML = html;

            // Evaluate scripts
            var scripts = elem.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerHTML);
            }

            // Go down
            var includes = elem.getElementsByTagName("include");
            for (i = 0; i < includes.length; i++) include(includes[i], null, depth + 1);
        };

        var html = localStorage[url], lastCached = 0;
        if (html) {
            lastCached = parseInt(html.substring(4));
            fn(html);
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        if (xhr.overrideMimeType) xhr.overrideMimeType("text/plain");
        // xhr.setRequestHeader("If-Modified-Since", (new Date(lastCached)).toUTCString());
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            elem.setAttribute("status", xhr.status);
            var lastModified = (new Date(xhr.getResponseHeader("Last-Modified")).getTime());
            if (xhr.status < 400 && lastModified < lastCached) return;
            var html = "<!-- "+(new Date()).getTime()+" -->\n"+xhr.responseText;
            fn(localStorage[url] = html);
        };
        xhr.send(null);
    }

    // Modern Browsers
    if (typeof(MutationObserver) != "undefined") {
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
    }
    // Old Versions of IE
    else if ("onreadystatechange" in document.documentElement) {
        document.attachEvent("onreadystatechange", function() {
            if (document.readyState != "complete") return;
            var nodes = document.getElementsByTagName("include");
            for (var i = 0; i < nodes.length; i++) include(nodes[i]);
        });
    }
    // Old Versions of Everything
    else {
        window.addEventListener("load", function() {
            var nodes = document.getElementsByTagName("include");
            for (var i = 0; i < nodes.length; i++) include(nodes[i]);
        }, true);
    }

    if (typeof(window) != "undefined") window.include = include;
    if (typeof(module) != "undefined") module.exports = include;

})(typeof(exports) == "undefined" ? this["include"] = { } : exports);
