import { LightningElement, track, wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CURRENCY_UPDATED_CHANNEL from '@salesforce/messageChannel/Currency_Updated__c';

export default class CurrencyConversionButton extends LightningElement {
    @track selectedCurrency;
    @track currencyOptions = [
        {label: 'USD', value: 'USD'},
        {label: 'BYN', value: 'BYN'}
    ]

    @wire(MessageContext)
    messageContext;

    handleChangeCurrency(event) {
        this.selectedCurrency = event.target.value;

        if (this.selectedCurrency === 'USD'){
            const payload = {
                currency: 'USD'
            } 
            publish(this.messageContext, CURRENCY_UPDATED_CHANNEL, payload);
        } else {
            const payload = {
                currency: 'BYN'
            } 
            publish(this.messageContext, CURRENCY_UPDATED_CHANNEL, payload);
        
        }
        
        
        console.log("change currency on " + this.selectedCurrency);
    }

}
