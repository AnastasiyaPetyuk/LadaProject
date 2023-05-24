import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
import createCase from '@salesforce/apex/CaseController.createCase';

export default class BuyAutoForm extends LightningModal {
    @api carName;

    @track name
    @track email; 
    @track phone;
    @track carEquipment;

    @track currencyOptions = [
        {label: 'Comfort', value: 'Comfort'},
        {label: 'Standart', value: 'Standart'},
        {label: 'Special Editor', value: 'Special Editor'},
        {label: 'Luxe Prestige', value: 'Luxe Prestige'}
    ]

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleCarEquipmentChange(event) {
        this.carEquipment = event.target.value;
    }

    handleSave() {
        createCase({ name: this.name, subject: 'BUY', email: this.email, phone: this.phone, question: this.carName + ', ' + this.carEquipment})
            .then(() => {  
                this.name = '';
                this.phone = '';
                this.email = '';
                this.question = '';             
            })
            .catch (error => {
                console.log(error);
            });

            this.close('okay');
    }
}