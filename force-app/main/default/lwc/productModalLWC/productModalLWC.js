import { api, wire, track } from 'lwc';
import LightningModal from 'lightning/modal';
import generatePDF from '@salesforce/apex/PDFController.generatePDF';
import { subscribe, MessageContext } from 'lightning/messageService';
import CURRENCY_UPDATED_CHANNEL from '@salesforce/messageChannel/Currency_Updated__c';

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
    subscription = null;
    selectedCurrency;


    @wire(MessageContext)
    messageContext;
    subscribeToMessageChannel() {
        this.subscription = subscribe(
        this.messageContext,
        CURRENCY_UPDATED_CHANNEL,
        (message) => this.handleMessage(message)
        );

    }

    handleMessage(message) {
        if(message.data.currency === 'BYN') {
            this.selectedCurrency = 'BYN';
        } else {
            this.selectedCurrency = 'USD';
        }
      }
    
    connectedCallback() {
        this.subscribeToMessageChannel();
    }


    handleOkay() {
        this.close('okay');
    }

    handleGeneratePDF() {
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
}