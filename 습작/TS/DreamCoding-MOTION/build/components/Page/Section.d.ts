import ComponentTemplate from '../PseudoComp.js';
export declare type SectionPayload = {
    sectionClass?: string;
    imgWrapperClass?: string;
    titleWrapperClass?: string;
    postsCntClass?: string;
};
export default class SectionCreator extends ComponentTemplate {
    private menuType;
    private $section;
    constructor(menuType: string);
    render(): HTMLElement;
}
