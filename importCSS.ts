import {StylesheetImport} from './types';
//https://davidwalsh.name/async-function-class
//needed for CDN support
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
let doImport: any;
try{
    doImport = (new AsyncFunction('path', 'return await import(path, {assert: {type: "css"}});')) as (url: string) => Promise<StylesheetImport>;
}catch(e){
    console.warn(e);
}

export async function importCSS(url: string, noFallback = false) : Promise<StylesheetImport | HTMLLinkElement | 'SyntaxError' | '404'> {
    try{
        return  await doImport(url);
    }catch(e: any){
        if(noFallback){
            if(e.message === 'doImport is not a function'){ //safari?
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

