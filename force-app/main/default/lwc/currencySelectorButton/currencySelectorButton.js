import { LightningElement, track} from 'lwc';

export default class CurrencyConversionButton extends LightningElement {
    priceUSD;
    priceBYN;

    @track selectedCurrency;
    @track currencyOptions = [
        {label: 'USD', value: 'USD'},
        {label: 'BYN', value: 'BYN'}
    ]
    handleCurrencyChange() {

    }
}
