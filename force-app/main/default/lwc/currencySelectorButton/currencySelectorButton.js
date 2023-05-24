import { LightningElement, wire} from 'lwc';
import SelectCurrency from '@salesforce/label/c.Select_Currency';
import { fireEvent } from 'c/pubSubConnector';
import { CurrentPageReference } from 'lightning/navigation';

export default class CurrencyConversionButton extends LightningElement {
    label = {
        SelectCurrency
    }
    get currencyOptions() {
        return [
            {label: 'USD', value: 'USD'},
            {label: 'BYN', value: 'BYN'}
        ];
    }
    
    currency = '';
    @wire(CurrentPageReference) pageRef;

    handleChangeCurrency(event) {
        fireEvent(this.pageRef, 'EventFromPub', event.target.value);
    }
}
