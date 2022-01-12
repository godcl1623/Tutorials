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
    ctnCreator(): HTMLElement;
}
declare abstract class ProtoPostCreator<B, M, T> implements IPostCreator {
    protected abstract baseModule(ipt: B): HTMLElement;
    protected abstract mediaPostCreator(ipt: M): HTMLElement;
    protected abstract textPostCreator(ipt: T): HTMLElement;
    abstract ctnCreator(): HTMLElement;
}
declare class PostCreator extends ProtoPostCreator<BasePayload, MediaPayload, TxtPayload> {
    protected menuType: string | null;
    constructor(menuType: string | null);
    protected baseModule(ipt: BasePayload): HTMLElement;
    protected mediaPostCreator(ipt: MediaPayload): HTMLElement;
    protected textPostCreator(ipt: TxtPayload): HTMLElement;
    ctnCreator(): HTMLElement;
}
declare const motionMenu: Element | null;
declare const menuBtns: NodeListOf<Element> | undefined;
declare const modalBg: Element | null;
declare const modalForm: Element | null | undefined;
declare const modalCloseBtn: Element | null | undefined;
declare function modalOpener(btns: NodeListOf<Element> | undefined, target: Element | null): void;
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
declare const addBtn: Element | null | undefined;
declare class SectionCreator extends ProtoPostCreator<SectionBase, SectionMedia, SectionTxt> {
    protected menuType: string | null;
    constructor(menuType: string | null);
}
