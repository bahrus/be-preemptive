import { define } from 'be-decorated/be-decorated.js';
import { register } from "be-hive/register.js";
export class BePreemptive {
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
