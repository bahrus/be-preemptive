import {BeDecoratedProps} from 'be-decorated/types';

export interface BePreemptiveVirtualProps{
    linkOrStylesheetPromise: Promise<HTMLLinkElement | StylesheetImport>;
    resource: HTMLLinkElement | StylesheetImport | undefined;
    domLoaded: boolean;
    invoked: boolean;
    assertType: 'css' | 'json';
}

export interface BePreemptiveProps extends BePreemptiveVirtualProps{
    proxy: HTMLLinkElement & BePreemptiveVirtualProps;
}

export interface BePreemptiveActions{
    intro(proxy: HTMLLinkElement & BePreemptiveVirtualProps, target: HTMLLinkElement, beDecor: BeDecoratedProps): void;
    onDOMLoaded(self: this): void;
    onAssertType(self: this): void;
}

export interface StylesheetImport{
    default: StyleSheet;

    
}