# be-preemptive [TODO]

```html
<link rel=lazy id=package-name/theme.css as=script crossorigin=anonymous integrity=... fetchpriority=1 be-preemptive=css href=https://some-cdn.com/package-name@1.2.3>
```

## First use case (short lived) -- preemptive use of CSS Modules

Browser vendors and CDN's are taking their sweet time in providing support for CSS Modules.  In the meantime, we can use this web component decorator / behavior to avoid that issue:



```JavaScript
await customElements.whenDefined('be-preemptive');
const linkOrStylesheet = await self['package-name/theme.css'].beDecorated.preemptive.linkOrStylesheetPromise();
```

In the case of Chromium based browsers, you will be provided a Stylesheet, which can be adopted as needed.  If not, you will probably want to append the returned link into your ShadowDOM root.

The value of rel can also be preload, which is really useful for non-lazy loaded web components. Or anything you want, really.

## Second use case (medium term, at most, hopefully?) -- passionately, but not aggressively, get needed resources ahead of time.

Beyond this short lived usage, this will also preemptively perform a css module import, but after waiting for the document to finish parsing (at a minimum), so as not to slow anything else down.  

However, calling the api above will start the download regardless.

This is meant for use cases where a web component lazy loads.  Having the css preload ahead of time is quite helpful, especially if streaming is used to stream in the HTML needed for the web component, w3c willing.  This would allow the browser to render the web component progressively without suffering from FOUC.

The browser probably has a good reason for complaining about abusing link rel=preload, so this provides a way to achieve that goal, hopefully in a responsible way.

## Specify not doing anything preemptively based on the user agent's [network connectivity](https://wicg.github.io/netinfo/#connection-attribute)

But remember, the moment anyone calls the api above, the download will begin regardless of any hesitation parameters specified.

