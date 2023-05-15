import { LightningElement, wire } from 'lwc';
import getAllAutomotiveCenters from '@salesforce/apex/AutomotiveCenterController.getAllAutomotiveCenters';
import AutomotiveCenters from '@salesforce/label/c.AutomotiveCenters';

export default class AutomotiveCentersGoogleMap extends LightningElement {
    label = {      
        AutomotiveCenters
    };
    mapMarkers = [];
    @wire(getAllAutomotiveCenters)
    wiredAutomotiveCenters({ error, data }) {
        if (data) {
            this.mapMarkers = data.map(center => {
                const City = center.City__c;
                const Address = center.Name;
                return {
                    location: {
                        City: City, 
                        Street: Address},
                    title: `LADA ${center.Type__c}, ${center.Name}`,
                    description: `${center.Phone__c}, 
                                  ${center.Working_Hours__c} `,
                    icon: 'utility:travel_and_places'
                };
            });
        } else if (error) {
            this.error = error;
        }
    }
}