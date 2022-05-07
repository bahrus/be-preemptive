import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from "be-hive/register.js";
import {BePreemptiveActions, BePreemptiveProps, BePreemptiveVirtualProps} from './types';

export class BePreemptive implements BePreemptiveActions{

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