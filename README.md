# be-preemptive

<a href="https://nodei.co/npm/be-preemptive/"><img src="https://nodei.co/npm/be-preemptive.png"></a>

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-preemptive?style=for-the-badge)](https://bundlephobia.com/result?p=be-preemptive)

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-preemptive?compression=gzip">

[TODO] -- Firefox broken

*be-preemptive* loads dependent resources eagerly, but not too eagerly.

```html
<link rel=lazy id=package-name/theme.css as=script crossorigin=anonymous integrity=... fetchpriority=low be-preemptive=css href=https://some-cdn.com/package-name@1.2.3>
```

## First use case (short-lived, hopefully) -- preemptive use of CSS Modules

Browser vendors and CDN's are taking their sweet time in providing support for CSS Modules.  In the meantime, we can use this web component decorator / behavior to avoid that obstacle:


```JavaScript
//this is a bit of a simplification, we are assuming the preemptive decorator has already attached to the link element.
//see be-loaded for more precise logic for how to do this.
const linkOrStylesheet = await self['package-name/theme.css'].beDecorated.preemptive.linkOrStylesheetPromise();
```

**NB:**  [Alternatives exist](https://github.com/guybedford/es-module-shims)

In the case of Chromium-based browsers, you will be provided a Stylesheet, which can be adopted as needed.  If not, you will probably want to append the returned link into your ShadowDOM root.

The value of rel can also be preload, which is really useful for non-lazy loaded web components.  And because pre-emptive actually downloads the file, the browser won't complain about having a preload tag go unfulfilled.

rel can be anything, really.

## Second use case (medium term, at most, hopefully?) -- passionately, but not aggressively, get needed resources ahead of time, without being chastised.

Beyond this short lived usage, be-preemptive will also preemptively perform a css module import, but (since the value of rel is lazy), after waiting for the document to finish parsing (at a minimum), so as not to slow anything else down.  

However, calling the api above will start the download regardless.

This is meant for use cases where a web component lazy loads.  Having css kept separate allows for multiple components to share the same css, and also web components can enable having the web component consumer design their own css without incurring any penalty from the provided (bundled) default css.  A third benefit of maintaining separate css files is better fine-grained caching. Finally, tooling may be better when editing css separately (though tooling could also merge the files, so that is a rather weak consideration).

Having the css pre download ahead of time in this scenario is quite helpful, especially if streaming is used to [stream in the HTML needed for the web component](https://www.youtube.com/watch?v=3sMflOp5kiQ), w3c willing.  (If using (declarative?) ShadowDOM for the entire component, streaming support may be far, far into the future).  This would allow the browser to render the web component progressively without suffering from FOUC.

The browser probably has a good reason for complaining about abusing link rel=preload, so this provides a way to achieve that goal, hopefully in a responsible way.

This functionality works well in combination with [be-loaded](https://github.com/bahrus/be-loaded) and [be-lazy](https://github.com/bahrus/be-lazy).

## Third use case

Lazy loading web components can ewly on link type=modulepreload to be more quick to load when needed.  But for unbundled components, this only downloads the top dependency.  But with pre-emptive, we can preload much more, while not lowering lighthouse scores.  

## Specify not doing anything preemptively based on the user agent's [network connectivity](https://wicg.github.io/netinfo/#connection-attribute) [TODO]

But remember, the moment anyone calls the api above, the download will begin regardless of any hesitation parameters specified.

## Use of fetchpriority [TODO]

## Support for media queries [TODO]

## Support for integrity [TODO]

[Not yet supported, apparently](https://github.com/tc39/proposal-import-assertions/issues/113)

## Resource Types supported

1.  CSS
2.  JSON [TODO]
3.  XSLT [TODO]

