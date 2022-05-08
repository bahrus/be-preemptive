# be-preemptive

*be-preemptive* loads dependent resources eagerly, but not too eagerly.

```html
<link rel=lazy id=package-name/theme.css as=script crossorigin=anonymous integrity=... fetchpriority=low be-preemptive=css href=https://some-cdn.com/package-name@1.2.3>
```

## First use case (short-lived, hopefully) -- preemptive use of CSS Modules

Browser vendors and CDN's are taking their sweet time in providing support for CSS Modules.  In the meantime, we can use this web component decorator / behavior to avoid that obstacle:


```JavaScript
await customElements.whenDefined('be-preemptive');
const linkOrStylesheet = await self['package-name/theme.css'].beDecorated.preemptive.linkOrStylesheetPromise();
```

**NB:**  [Alternatives exist](https://github.com/guybedford/es-module-shims)

In the case of Chromium based browsers, you will be provided a Stylesheet, which can be adopted as needed.  If not, you will probably want to append the returned link into your ShadowDOM root.

The value of rel can also be preload, which is really useful for non-lazy loaded web components. Or anything you want, really.

## Second use case (medium term, at most, hopefully?) -- passionately, but not aggressively, get needed resources ahead of time.

Beyond this short lived usage, be-preemptive will also preemptively perform a css module import, but (since the value of rel is lazy), after waiting for the document to finish parsing (at a minimum), so as not to slow anything else down.  

However, calling the api above will start the download regardless.

This is meant for use cases where a web component lazy loads.  Having css kept separate allows for multiple components to share the same css, and also web components can enable having the web component consumer design their own css without incurring any penalty from the default css if the developer choses to forgo it.

Having the css pre download ahead of time in this scenario is quite helpful, especially if streaming is used to stream in the HTML needed for the web component, w3c willing.  This would allow the browser to render the web component progressively without suffering from FOUC.

The browser probably has a good reason for complaining about abusing link rel=preload, so this provides a way to achieve that goal, hopefully in a responsible way.

This functionality works well in combination with [be-loaded](https://github.com/bahrus/be-loaded) and [be-lazy](https://github.com/bahrus/be-lazy).

## Specify not doing anything preemptively based on the user agent's [network connectivity](https://wicg.github.io/netinfo/#connection-attribute) [TODO]

But remember, the moment anyone calls the api above, the download will begin regardless of any hesitation parameters specified.

## Use of fetchpriority [TODO]

## Resource Types supported

1.  CSS
2.  JSON [TODO]
3.  XSLT [TODO]

