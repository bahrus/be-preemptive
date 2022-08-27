import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from "be-hive/register.js";
import {BePreemptiveActions, BePreemptiveProps, BePreemptiveVirtualProps, StylesheetImport} from './types';


export class BePreemptive extends EventTarget implements BePreemptiveActions{

    intro(proxy: HTMLLinkElement & BePreemptiveVirtualProps, target: HTMLLinkElement, beDecor: BeDecoratedProps){
        if(target.rel !== 'lazy') return;
        if(document.readyState === 'loading'){
            document.addEventListener('DOMContentLoaded', e => {
                proxy.domLoaded = true;
            }, {once: true});
            return;
        }
        proxy.domLoaded = true;
    }

    onAssertType({proxy, assertType}: this){
        switch(assertType){
            case 'css':
                proxy.linkOrStylesheetPromise = new Promise<HTMLLinkElement | StylesheetImport>((resolve, reject) => {
                    if(proxy.resource !== undefined){
                        resolve(proxy.resource);
                        return;
                    }
                    import('./importCSS.js').then(({importCSS}) => {
                        const resource = importCSS(proxy.href).then((resource) => {
                            if(typeof resource === 'object'){
                                proxy.resource = resource;
                                resolve(resource);
                                proxy.resolved = true;
                            }else{
                                reject(resource);
                                proxy.rejected = true;
                            }
                            
                        });
                    });
                });
                break;
        }
    }

    onDOMLoaded({proxy, linkOrStylesheetPromise}: this){
        requestIdleCallback(() => {
            if(linkOrStylesheetPromise !== undefined){
                linkOrStylesheetPromise.then(resource => {
                    proxy.resolved = true;
                });
            }
        });

    }

}

export interface BePreemptive extends BePreemptiveProps{}

const tagName = 'be-preemptive';

const ifWantsToBe = 'preemptive';

const upgrade = 'link';

define<BePreemptiveProps & BeDecoratedProps<BePreemptiveProps, BePreemptiveActions>, BePreemptiveActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            forceVisible: ['link'],
            virtualProps: ['linkOrStylesheetPromise', 'resource', 'domLoaded', 'assertType'],
            intro: 'intro',
            primaryProp: 'assertType',
            proxyPropDefaults: {
                assertType: 'css',
            },
            emitEvents: ['linkOrStylesheetPromise']
        },
        actions:{
            onDOMLoaded: {
                ifAllOf: ['domLoaded'],
                ifKeyIn: ['linkOrStylesheetPromise'],
            },
            onAssertType: 'assertType',
        }
    },
    complexPropDefaults:{
        controller: BePreemptive,
    }
});

register(ifWantsToBe, upgrade, tagName);

const head = document.head;
import('be-vigilant/be-vigilant.js');
if(!(<any>head).beDecorated?.vigilant){
    head.setAttribute('be-vigilant', JSON.stringify({"forBs": true}));
}
