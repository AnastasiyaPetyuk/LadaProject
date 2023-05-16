import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import generatePDF from '@salesforce/apex/PDFController.generateAndDownloadPDF';

export default class ProductModalLWC extends LightningModal {
    @api content;
    @api headerText;
    @api carName;
    @api carYear;
    @api carImage;
    @api carDescription;

    // product;
    // currencySetting;
    // language;


    handleOkay() {
        this.close('okay');
    }

    handleDowloadPrices() {
        generatePDF({ 
            product: "some product",
            currencySetting: "some price from settings",
            language: "languge"
        })
        .catch(error => {
            // Handle any errors
            console.error('Error generating and downloading PDF:', error);
        });

    }

    handleTestDrive() {

    }

    handleBuyAuto() {

    }
}