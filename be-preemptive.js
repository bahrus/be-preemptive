import { define } from 'be-decorated/be-decorated.js';
import { register } from "be-hive/register.js";
export class BePreemptive {
    #mutationObserver;
    intro(proxy, target, beDecor) {
    }
}
const tagName = 'be-preemptive';
const ifWantsToBe = 'preemptive';
const upgrade = 'link';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: ['link'],
        }
    }
});
register(ifWantsToBe, upgrade, tagName);
function introduceToPreemptive(newTarget) {
    document.querySelector('be-preemptive').newTarget = newTarget;
}
const test = 'link[be-preemptive],link[data-be-preemptive';
const headObserver = new MutationObserver((mutationList, observer) => {
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
    introduceToPreemptive(link);
});
headObserver.observe(document.head, { childList: true });
