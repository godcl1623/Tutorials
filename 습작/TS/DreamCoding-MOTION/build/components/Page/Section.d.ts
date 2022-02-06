import ComponentTemplate from '../PseudoComp';
export declare type SectionPayload = {
    sectionClass?: string;
    imgWrapperClass?: string;
    titleWrapperClass?: string;
    postsCntClass?: string;
};
export default class _SectionCreator extends ComponentTemplate {
    private payload;
    constructor(payload: SectionPayload);
}
