import {BeDecoratedProps} from 'be-decorated/types';

export interface BePreemptiveVirtualProps{
    linkOrStylesheetPromise: Promise<HTMLLinkElement | StylesheetImport>;
}

export interface BePreemptiveProps extends BePreemptiveVirtualProps{
    proxy: HTMLLinkElement & BePreemptiveVirtualProps;
}

export interface BePreemptiveActions{
    intro(proxy: Element & BePreemptiveVirtualProps, target: Element, beDecor: BeDecoratedProps): void;
}