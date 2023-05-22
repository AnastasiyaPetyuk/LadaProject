import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
import createLead from '@salesforce/apex/LeadController.createLead';

export default class OrderTestDriveForm extends LightningModal {
    @api carName;
    @track lastName;
    @track firstName;
    @track email; 
    @track phone;

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

    handleSave() {
        createLead({
            lastName: this.lastName,
            firstName: this.firstName,
            email: this.email,
            phone: this.phone,
            title: this.carName 
        })
            .then(() => {
                this.lastName = '';
                this.firstName = '';
                this.email = '';
                this.phone = '';
            })
            .catch(error => {
                console.error('Error creating request:', error);
            });
    }    

}