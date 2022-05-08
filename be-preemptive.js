import { define } from 'be-decorated/be-decorated.js';
import { register } from "be-hive/register.js";
export class BePreemptive {
    intro(proxy, target, beDecor) {
        proxy.linkOrStylesheetPromise = new Promise((resolve, reject) => {
            if (proxy.resource !== undefined) {
                resolve(proxy.resource);
                return;
            }
            import('./importCSS.js').then(({ importCSS }) => {
                const resource = importCSS(proxy.href).then((resource) => {
                    proxy.resource = resource;
                    resolve(resource);
                });
            });
        });
        if (target.rel !== 'lazy')
            return;
        if (document.readyState !== 'complete') {
            document.addEventListener('DOMContentLoaded', e => {
                proxy.domLoaded = true;
            }, { once: true });
            return;
        }
        proxy.domLoaded = true;
    }
    onDOMLoaded({ proxy, linkOrStylesheetPromise }) {
        requestIdleCallback(() => {
            proxy.linkOrStylesheetPromise.then(resource => {
                proxy.invoked = true;
            });
        });
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
            virtualProps: ['linkOrStylesheetPromise', 'resource', 'domLoaded', 'invoked'],
            intro: 'intro',
        },
        actions: {
            onDOMLoaded: 'domLoaded',
        }
    },
    complexPropDefaults: {
        controller: BePreemptive,
    }
});
register(ifWantsToBe, upgrade, tagName);
function introduceToPreemptive(newTarget) {
    document.querySelector('be-preemptive').newTarget = newTarget;
}
const test = 'link[be-preemptive],link[data-be-preemptive]';
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
