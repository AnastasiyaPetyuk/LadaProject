import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class ProductModalLWC extends LightningModal {
    @api content;
    @api headerText;
    @api carName;
    @api carYear;
    @api carImage;
    @api carDescription;
    handleOkay() {
        this.close('okay');
    }
}