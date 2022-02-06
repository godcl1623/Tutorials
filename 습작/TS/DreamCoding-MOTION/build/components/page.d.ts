interface IPostCreator {
    ctnCreator(): HTMLElement | HTMLElement[];
}
declare abstract class ProtoPostCreator<B, M, T> implements IPostCreator {
    protected abstract baseModule(ipt: B): HTMLElement;
    protected abstract mediaPostCreator(ipt: M, url?: string, title?: string): HTMLElement | HTMLElement[];
    protected abstract textPostCreator(ipt: T, body?: string, title?: string): HTMLElement;
    abstract ctnCreator(): HTMLElement | HTMLElement[];
}
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
declare type DOMRectTemp<T> = {
    [P in keyof T]?: T[P];
};
declare type DOMRectEdited = DOMRectTemp<DOMRect>;
export declare class Dnd {
    static clientCoords: DOMRectEdited;
    static lastElDir: string;
    static initYCoord: number;
    static lastElIdx: number;
    static dragged: HTMLElement | null;
    static motionPosts: HTMLElement;
    chkLastIdx: (event: Event) => void;
    itemTopOrBot: (event: MouseEvent) => void;
    dragEventsController: (tgt: HTMLElement) => void;
    static dropEventsController: () => void;
}
export declare class SectionCreator extends ProtoPostCreator<SectionBase, SectionMedia, SectionTxt> {
    protected menuType: string | null;
    protected title?: string | undefined;
    protected url?: string | undefined;
    protected body?: string | undefined;
    protected static _itemId: number;
    get itemId(): number;
    set itemId(val: number);
    constructor(menuType: string | null, title?: string | undefined, url?: string | undefined, body?: string | undefined);
    protected delPost(e: Event): void;
    protected baseModule(ipt: SectionBase): HTMLElement;
    protected mediaPostCreator(ipt: SectionMedia, url: string, title: string): HTMLElement[];
    protected textPostCreator(ipt: SectionTxt, body: string, title: string): HTMLElement;
    ctnCreator(): HTMLElement;
}
export {};
