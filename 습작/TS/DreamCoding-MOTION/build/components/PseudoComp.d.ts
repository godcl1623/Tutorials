interface ComponentBuilder {
    render(): HTMLDivElement;
}
export declare class ComponentTemplate implements ComponentBuilder {
    protected container: HTMLDivElement;
    constructor(htmlStructureString: string);
    render(): HTMLDivElement;
}
declare class TempDOM {
    render(appContents: string, appRoot: HTMLDivElement): void;
    createPortal(htmlContents: string, modalRoot: HTMLDivElement): void;
}
declare const _default: TempDOM;
export default _default;
