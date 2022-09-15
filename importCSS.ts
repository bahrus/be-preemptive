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
        const firefox = e.message === 'doImport is not a function';
        if(noFallback){
            if(firefox){ //safari?
                return 'SyntaxError';
            }
            return '404';
        }
        if(!firefox){ 
            console.error(e);
            return '404';
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        return link;
    }
    
}

