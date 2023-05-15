import { LightningElement, wire, track } from 'lwc';
import getExchangeRates from '@salesforce/apex/CurrencyConversionController.getExchangeRates';

export default class CurrencyConversion extends LightningElement {
    @track selectedCurrency = '';
    @track convertedAmount = '';
    @track exchangeRates = [];

    handleCurrencySelection(event) {
        this.selectedCurrency = event.target.dataset.currencyCode;
    }

    handleConversion() {
        if (!this.selectedCurrency) {
            return;
        }

        let exchangeRate = this.exchangeRates.find(rate => rate.Currency_Code__c === this.selectedCurrency);
        if (!exchangeRate) {
            return;
        }

        let amount = parseFloat(this.template.querySelector('.amount-input').value);
        if (isNaN(amount) || amount <= 0) {
            return;
        }

        this.convertedAmount = (amount * exchangeRate.Exchange_Rate__c).toFixed(2);
    }

    @wire(getExchangeRates)
    wiredExchangeRates({ error, data }) {
        if (data) {
            this.exchangeRates = data;
        } else if (error) {
            console.error(error);
        }
    }
}
