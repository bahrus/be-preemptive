# be-preemptive

```html
<link rel=lazy id=package-name/theme.css as=script fetchpriority=1 be-preemptive=css href=https://some-cdn.com/package-name@1.2.3>
```

## First use case (short lived) -- preemptive use of CSS Modules

Browser vendors and CDN's are taking their sweet time in providing support for CSS Modules.  In the meantime, we can use this web component decorator / behavior to avoid that issue:



```JavaScript
await customElements.whenDefined('be-preemptive');
const linkOrStylesheet = await self['package-name/theme.css'].beDecorated.preemptive.stylesheetPromise();
```

