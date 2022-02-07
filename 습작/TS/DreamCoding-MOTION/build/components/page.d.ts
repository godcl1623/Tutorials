declare type DOMRectTemp<T> = {
    [P in keyof T]?: T[P];
};
declare type DOMRectEdited = DOMRectTemp<DOMRect>;
export default class Dnd {
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
export {};
