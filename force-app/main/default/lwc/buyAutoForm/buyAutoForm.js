import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
import createContactWithProductOpportunity from '@salesforce/apex/ContactController.createContactWithProductOpportunity';

export default class BuyAutoForm extends LightningModal {
    @api carName;

    @track lastName;
    @track firstName;
    @track email; 
    @track phone;
    @track carEquipment;

    @track currencyOptions = [
        {label: 'Comfort', value: 'Comfort'},
        {label: 'Standart', value: 'Standart'}
    ]

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }
    handleFirstNameChange(event) {
        this.firstName = event.target.value;
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
        createContactWithProductOpportunity({
            lastName: this.lastName,
            firstName: this.firstName,
            email: this.email,
            phone: this.phone,
            carName: this.carName,
            carEquipment: this.carEquipment 
        })
            .then(() => {
                this.lastName = '';
                this.firstName = '';
                this.email = '';
                this.phone = '';
                console.log("1 OK we inside func");
            })
            .catch(error => {
                console.error('Error creating request:', error);
            });
    } 
}