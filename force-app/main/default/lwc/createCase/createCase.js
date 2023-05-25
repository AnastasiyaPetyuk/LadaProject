import { LightningElement, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createCase from '@salesforce/apex/CaseController.createCase';
import AskQuestion from '@salesforce/label/c.AskQuestion';
import YourName from '@salesforce/label/c.YourName';
import YourPhone from '@salesforce/label/c.YourPhone';
import YourEmail from '@salesforce/label/c.YourEmail';
import YourQuestion from '@salesforce/label/c.YourQuestion';
import Submit from '@salesforce/label/c.Submit';


export default class CreateCase extends LightningElement {
    label = {   
        AskQuestion,
        YourName,
        YourPhone,
        YourEmail,
        YourQuestion,
        Submit
    };
    @track name;
    @track email; 
    @track phone; 
    @track question; 

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleQuestionChange(event) {
        this.question = event.target.value;
    }

    handleCreateCase() {
        createCase({ name: this.name, subject: 'Q&A', email: this.email, phone: this.phone, question: this.question })
            .then(() => {  
                this.name = '';
                this.phone = '';
                this.email = '';
                this.question = '';             
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Question created',
                        variant: 'success',
                    }),
                );
            })
            .catch (error => {
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


