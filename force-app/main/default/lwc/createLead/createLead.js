import { LightningElement, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createLead from '@salesforce/apex/LeadController.createLead';

export default class CreateLead extends LightningElement {
    @track lastName;
    @track firstName;
    @track email;

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleCreateLead() {
        createLead({ lastName: this.lastName, firstName: this.firstName, email: this.email })
            .then(result => {
                this.lastName = '';
                this.firstName = '';
                this.email = ''; 
                
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Request for test-drive created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: error.body.message, 
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}
