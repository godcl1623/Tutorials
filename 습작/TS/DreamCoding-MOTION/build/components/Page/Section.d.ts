import ComponentTemplate from '../Util/PseudoComp.js';
export default class SectionCreator extends ComponentTemplate {
    private menuType;
    private $section;
    constructor(menuType: string);
    render(): HTMLElement;
}
