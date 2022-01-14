declare type BasePayload = {
    forVal: string;
    labelTxt: string;
};
declare type MediaPayload = {
    nameVal: BasePayload['forVal'];
    classVal: string;
};
declare type TxtPayload = MediaPayload;
interface IPostCreator {
    ctnCreator(): HTMLElement | HTMLElement[];
}
declare abstract class ProtoPostCreator<B, M, T> implements IPostCreator {
    protected abstract baseModule(ipt: B): HTMLElement;
    protected abstract mediaPostCreator(ipt: M, url?: string, title?: string): HTMLElement | HTMLElement[];
    protected abstract textPostCreator(ipt: T, body?: string, title?: string): HTMLElement;
    abstract ctnCreator(): HTMLElement | HTMLElement[];
}
declare class PostCreator extends ProtoPostCreator<BasePayload, MediaPayload, TxtPayload> {
    protected menuType: string | null;
    constructor(menuType: string | null);
    protected baseModule(ipt: BasePayload): HTMLElement;
    protected mediaPostCreator(ipt: MediaPayload): HTMLElement;
    protected textPostCreator(ipt: TxtPayload): HTMLElement;
    ctnCreator(): HTMLElement[];
}
declare const motionMenu: Element | null;
declare const menuBtns: NodeListOf<Element> | undefined;
declare const modalBg: Element | null;
declare const modalForm: Element | null | undefined;
declare const modalCloseBtn: Element | null | undefined;
declare let selectedMenu: string | null;
declare function modalOpener(btns: NodeListOf<Element> | undefined, modalBg: Element | null, modalForm: Element | null | undefined): void;
declare function modalCloser(bg: Element | null, btn: Element | null | undefined): void;
declare type SectionBase = {
    sectionClass: string;
};
declare type SectionMedia = {
    imgWrapperClass: string;
    titleWrapperClass: string;
};
declare type SectionTxt = {
    postsCntClass: string;
};
declare class SectionCreator extends ProtoPostCreator<SectionBase, SectionMedia, SectionTxt> {
    protected menuType: string | null;
    protected title?: string | undefined;
    protected url?: string | undefined;
    protected body?: string | undefined;
    constructor(menuType: string | null, title?: string | undefined, url?: string | undefined, body?: string | undefined);
    protected baseModule(ipt: SectionBase): HTMLElement;
    protected mediaPostCreator(ipt: SectionMedia, url: string, title: string): HTMLElement[];
    protected textPostCreator(ipt: SectionTxt, body: string, title: string): HTMLElement;
    ctnCreator(): HTMLElement;
}
