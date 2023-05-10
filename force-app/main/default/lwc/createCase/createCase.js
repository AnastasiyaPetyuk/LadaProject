import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import TOPIC_FIELD from '@salesforce/schema/Case.Topic__c';
import NAME_FIELD from '@salesforce/schema/Case.Name__c';
import PHONE_FIELD from '@salesforce/schema/Case.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/Case.Email__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';

export default class CreateCase extends LightningElement {
    @track topic;
    @track name;
    @track phone;
    @track email;
    @track description;

    handleTopicChange(event) {
        this.topic = event.target.value;
    }


    handleNameChange(event) {
        this.name = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    createCase() {
        const fields = {};
        fields[TOPIC_FIELD.fieldApiName] = this.topic;
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;

        const recordInput = { apiName: CASE_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(caseRecord => {
                console.log('Case record created:', caseRecord.id);
            })
            .catch(error => {
                console.error('Error creating case record:', error);
            });
    }
}
