import ComponentTemplate from '../Util/PseudoComp.js';
export declare type DialogPayload = {
    forVal?: string;
    labelTxt?: string;
    nameVal?: string;
    classVal?: string;
};
export default class PostCreateDialog extends ComponentTemplate {
    private payload;
    private menuType;
    constructor(menuType: string, payload: DialogPayload);
    private generateDialog;
}
