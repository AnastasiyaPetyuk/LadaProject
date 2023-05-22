import { LightningElement, track, wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CURRENCY_UPDATED_CHANNEL from '@salesforce/messageChannel/Currency_Updated__c';

export default class CurrencyConversionButton extends LightningElement {
    
    get currencyOptions() {
        return [
            {label: 'USD', value: 'USD'},
            {label: 'BYN', value: 'BYN'}
        ];
    }

    @wire(MessageContext)
    messageContext;
    handleChangeCurrency(event) {
        const payload = { 
        currency: event.target.value
        };
        publish(this.messageContext, CURRENCY_UPDATED_CHANNEL, payload);
    }      
}
