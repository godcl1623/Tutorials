interface ComponentBuilder {
    render(): HTMLElement;
}
export default class ComponentTemplate implements ComponentBuilder {
    protected container: HTMLDivElement;
    constructor(htmlStructureString: string);
    render(): HTMLElement;
}
export {};
