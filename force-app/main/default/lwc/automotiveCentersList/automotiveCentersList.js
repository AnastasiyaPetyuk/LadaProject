import { LightningElement, wire } from 'lwc';
import getAllAutomotiveCenters from '@salesforce/apex/AutomotiveCenterController.getAllAutomotiveCenters';
import AutomotiveCenters from '@salesforce/label/c.AutomotiveCenters';

export default class AutomotiveCentersList extends LightningElement {
    label = {
        AutomotiveCenters
    };

    centerData;

    @wire(getAllAutomotiveCenters) 
    wiredAutomotiveCenters({error, data}) {
        if (data) {
            this.centerData = data.map((center) => ({
                id: center.Id,
                city: center.City__c,
                name: center.Name,
                type: center.Type__c,
                phone: center.Phone__c,
                workingHours: center.Working_Hours__c
            }));
        } else if (error) {
            console.error(error);
        }
    }
}
