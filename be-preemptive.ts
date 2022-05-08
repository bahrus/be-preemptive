import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from "be-hive/register.js";
import {BePreemptiveActions, BePreemptiveProps, BePreemptiveVirtualProps} from './types';


export class BePreemptive implements BePreemptiveActions{

    intro(proxy: Element & BePreemptiveVirtualProps, target: Element, beDecor: BeDecoratedProps){
        linkOrStylesheetPromise

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