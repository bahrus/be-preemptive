import {BeDecoratedProps} from 'be-decorated/types';

export interface BePreemptiveVirtualProps{
    linkOrStylesheetPromise: Promise<HTMLLinkElement | StylesheetImport>;
    resource: HTMLLinkElement | StylesheetImport | undefined;
}

export interface BePreemptiveProps extends BePreemptiveVirtualProps{
    proxy: HTMLLinkElement & BePreemptiveVirtualProps;
}

export interface BePreemptiveActions{
    intro(proxy: HTMLLinkElement & BePreemptiveVirtualProps, target: Element, beDecor: BeDecoratedProps): void;
}

export interface StylesheetImport{
    default: StyleSheet;
}