import { api, wire} from 'lwc';
import LightningModal from 'lightning/modal';
import generatePDF from '@salesforce/apex/PDFController.generatePDF';
import { subscribe, MessageContext, APPLICATION_SCOPE} from 'lightning/messageService';
import CURRENCY_UPDATED_CHANNEL from '@salesforce/messageChannel/Currency_Updated__c';

export default class ProductDetails extends LightningModal {
    @api content;
    @api headerText;
    @api carName;
    @api carYear;
    @api carImage;
    @api carDescription;
    @api carBody;
    @api carCheckpoint;
    @api carDriveUnit;
    selectedCurrency = 'USD';
    subscription = null;

    @wire(MessageContext)
    messageContext;
    subscribeToMessageChannel() {
      this.subscription = subscribe(
        this.messageContext,
        CURRENCY_UPDATED_CHANNEL,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
    handleMessage(message) {
      this.selectedCurrency = message.currency;
    }
    connectedCallback() {
      this.subscribeToMessageChannel();
    }

    handleGeneratePDF() {
        generatePDF({ productName: this.carName, selectedCurrency: this.selectedCurrency})
        .then((result) => {
            console.log(this.selectedCurrency + "currency details");
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
}