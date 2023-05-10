import { LightningElement, api, track, wire } from 'lwc';
import getAllAutomotiveCenters from '@salesforce/apex/AutomotiveCenterController.getAllAutomotiveCenters';

export default class AutomotiveCentersList extends LightningElement {
    @wire(getAllAutomotiveCenters) automotiveCenters;
    error;
    connectedCallback() {
        this.loadAutomotiveCenters();
    }

    loadAutomotiveCenters() {
        getAllAutomotiveCenters()
            .then(result => {
                this.automotiveCenters = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.automotiveCenters = undefined;
            });
    }

    handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}

    get hasResults() {
        return (this.automotiveCenters.length > 0);
    }

}