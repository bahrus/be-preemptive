//https://davidwalsh.name/async-function-class
//needed for CDN support
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
let doImport;
try {
    doImport = (new AsyncFunction('path', 'return await import(path, {assert: {type: "css"}});'));
}
catch (e) {
    console.warn(e);
}
export async function importCSS(url, noFallback = false) {
    try {
        return await doImport(url);
    }
    catch (e) {
        if (noFallback) {
            if (e.message === 'doImport is not a function') { //safari?
                return 'SyntaxError';
            }
            return '404';
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        return link;
    }
}
