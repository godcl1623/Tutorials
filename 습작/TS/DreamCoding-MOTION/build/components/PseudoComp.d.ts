interface ComponentBuilder {
    render(): HTMLDivElement;
}
export default class ComponentTemplate implements ComponentBuilder {
    protected container: HTMLDivElement;
    constructor(htmlStructureString: string);
    render(): HTMLDivElement;
}
export {};
