import { ComponentTemplate } from '../PseudoComp.js';
export declare type Payload = {
    forVal?: string;
    labelTxt?: string;
    nameVal?: string;
    classVal?: string;
};
export default class PostCreateDialog extends ComponentTemplate {
    private payload;
    private menuType;
    constructor(menuType: string, payload: Payload);
    private generateDialog;
}
