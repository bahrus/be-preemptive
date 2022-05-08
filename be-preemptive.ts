import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from "be-hive/register.js";
import {BePreemptiveActions, BePreemptiveProps, BePreemptiveVirtualProps, StylesheetImport} from './types';


export class BePreemptive implements BePreemptiveActions{

    intro(proxy: HTMLLinkElement & BePreemptiveVirtualProps, target: Element, beDecor: BeDecoratedProps){
        proxy.linkOrStylesheetPromise = new Promise<HTMLLinkElement | StylesheetImport>((resolve, reject) => {
            if(proxy.resource !== undefined){
                resolve(proxy.resource);
                return;
            }
            import('./importCSS.js').then(({importCSS}) => {
                const resource = importCSS(proxy.href).then((resource) => {
                    proxy.resource = resource;
                    resolve(resource);
                });
            });
        });
        if(document.readyState === 'loading'){
            document.addEventListener('DOMContentLoaded', e => {
                proxy.domLoaded = true;
            }, {once: true});
            return;
        }
        proxy.domLoaded = true;
    }

    onDOMLoaded({proxy, linkOrStylesheetPromise}: this){
        requestIdleCallback(() => {
            proxy.linkOrStylesheetPromise.then(resource => {
                proxy.invoked = true;
            });
        })

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
            virtualProps: ['linkOrStylesheetPromise', 'resource', 'domLoaded', 'invoked'],
        }
    }
});

register(ifWantsToBe, upgrade, tagName);

function introduceToPreemptive(newTarget: HTMLLinkElement){
    (document.querySelector('be-preemptive') as any as BeDecoratedProps).newTarget = newTarget;

}
const test = 'link[be-preemptive],link[data-be-preemptive]';
const headObserver = new MutationObserver((mutationList: MutationRecord[], observer: MutationObserver) => {
    for (const mutation of mutationList) {
        const addedNodes = Array.from(mutation.addedNodes);
        for (const addedNode of addedNodes) {
            if (addedNode instanceof HTMLLinkElement) {
                if (addedNode.matches(test)) {
                    introduceToPreemptive(addedNode);
                }
            }
        }
    }
});
document.head.querySelectorAll(test).forEach(link => {
    introduceToPreemptive(link as HTMLLinkElement);
});
headObserver.observe(document.head, {childList: true});