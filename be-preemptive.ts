import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, Proxy, PP, VirtualProps, StylesheetImport} from './types';


export class BePreemptive extends EventTarget implements Actions{

    intro(proxy: Proxy, target: HTMLLinkElement, beDecor: BeDecoratedProps){
        if(target.rel !== 'lazy') return;
        if(document.readyState === 'loading'){
            document.addEventListener('DOMContentLoaded', e => {
                proxy.domLoaded = true;
            }, {once: true});
            return;
        }
        proxy.domLoaded = true;
    }

    onAssertType({proxy, assertType}: PP){
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
            case 'esm':
                import(proxy.href);
                break;
        }
    }

    onDOMLoaded({proxy, linkOrStylesheetPromise}: PP){
        requestIdleCallback(() => {
            if(linkOrStylesheetPromise !== undefined){
                linkOrStylesheetPromise.then(resource => {
                    proxy.resolved = true;
                });
            }
        });

    }

}

const tagName = 'be-preemptive';

const ifWantsToBe = 'preemptive';

const upgrade = 'link';

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
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
const {attachBehiviors} = await import('be-vigilant/attachBehiviors.js');
attachBehiviors(document.head, {
    childList: true
});
