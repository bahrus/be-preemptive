import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface BePreemptiveEndUserProps {
    assertType: 'css' | 'json';
}
export interface BePreemptiveVirtualProps extends MinimalProxy, BePreemptiveEndUserProps{
    linkOrStylesheetPromise: Promise<HTMLLinkElement | StylesheetImport>;
    resource: HTMLLinkElement | StylesheetImport | undefined;
    domLoaded: boolean;
    //invoked: boolean;
    
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

export type LinkOrStylesheet = HTMLLinkElement | StylesheetImport;