import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface BePreemptiveEndUserProps {
    assertType: 'css' | 'json';
}
export interface BePreemptiveVirtualProps extends MinimalProxy, BePreemptiveEndUserProps{
    linkOrStylesheetPromise: Promise<HTMLLinkElement | StylesheetImport>;
    resource: HTMLLinkElement | StylesheetImport | undefined;
    domLoaded: boolean;
}

export type Proxy = HTMLLinkElement & BePreemptiveVirtualProps;

export interface ProxyProps extends BePreemptiveVirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface BePreemptiveActions{
    intro(pp: Proxy, target: HTMLLinkElement, beDecor: BeDecoratedProps): void;
    onDOMLoaded(pp: PP): void;
    onAssertType(pp: PP): void;
}

export interface StylesheetImport{
    default: StyleSheet;
}

export type LinkOrStylesheet = HTMLLinkElement | StylesheetImport;