This folder contains the HTML template for the site:

* baseof.html : The base template used by all pages
* single.html : The template used for single pages
* list.html : The template used for list page (i.e. a list of pages)
* terms.html : The template used when browsing a single term (e.g. a single tag)
* index.hmtl : The home/start page

Additional useful links:

* Template lookup: https://gohugo.io/templates/lookup-order/
* The "blocks" concept: https://gohugo.io/templates/base/
* Context (aka "the dot"): https://gohugo.io/templates/introduction/#the-dot
  * NOTE: "$." (aka "global context") is not(!) passed to partials
* The ".Page" object: https://gohugo.io/variables/page/
  * Page Kind: https://gohugo.io/methods/page/kind/
    * IsPage: https://gohugo.io/methods/page/ispage/
* The ".Site" object: https://gohugo.io/variables/site/
* Pass variables to partials: https://mertbakir.gitlab.io/hugo/pass-arguments-in-partials-hugo/

To print a slice or map, use:

    <pre>{{ debug.Dump .Data }}</pre>
