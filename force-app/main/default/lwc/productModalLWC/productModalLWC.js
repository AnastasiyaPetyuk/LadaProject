import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import generatePDF from '@salesforce/apex/PDFController.generatePDF';

export default class ProductModalLWC extends LightningModal {
    @api content;
    @api headerText;
    @api carName;
    @api carYear;
    @api carImage;
    @api carDescription;
    @api carBody;
    @api carCheckpoint;
    @api carDriveUnit;
    selectedCurrency;


    handleGeneratePDF() {
        console.log("download pdf");
        generatePDF({ productName: this.carName, selectedCurrency: this.selectedCurrency})
        .then((result) => {
            const pdfBlob = this.base64ToBlob(result);
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'carPrices.pdf';

            downloadLink.click();
        })
        .catch((error) => {
            console.error('Error generating PDF:', error);
        });
    }

    base64ToBlob(base64String) {
        const byteCharacters = this.base64ToUint8Array(base64String);
        const byteArrays = [byteCharacters];
        const blob = new Blob(byteArrays, { type: 'application/pdf' });
        return blob;
    }
    
    base64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
        }
    
        return outputArray;
    }

    handleOkay() {
        this.close('okay');
    }

    handleTestDrive() {

    }

    handleBuyAuto() {

    }
}