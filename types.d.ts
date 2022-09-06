import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface EndUserProps {
    assertType: 'css' | 'json';
}
export interface VirtualProps extends MinimalProxy, EndUserProps{
    linkOrStylesheetPromise: Promise<HTMLLinkElement | StylesheetImport>;
    resource: HTMLLinkElement | StylesheetImport | undefined;
    domLoaded: boolean;
}

export type Proxy = HTMLLinkElement & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export interface Actions{
    intro(pp: Proxy, target: HTMLLinkElement, beDecor: BeDecoratedProps): void;
    onDOMLoaded(pp: PP): void;
    onAssertType(pp: PP): void;
}

export interface StylesheetImport{
    default: StyleSheet;
}

export type LinkOrStylesheet = HTMLLinkElement | StylesheetImport;