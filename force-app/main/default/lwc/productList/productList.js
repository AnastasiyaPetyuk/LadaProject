import { LightningElement, wire } from 'lwc';
import getProductList from '@salesforce/apex/ProductController.getProductList';

export default class ProductList extends LightningElement {
    @wire(getProductList)
    products;

    showModal = false;
    selectedProduct = {};

    openModal(event) {
        event.preventDefault();
        this.showModal = true;
        const productId = event.currentTarget.dataset.id;
        this.selectedProduct = this.products.data.find(p => p.Id === productId);
    }

    closeModal() {
        this.showModal = false;
        this.selectedProduct = {};
    }
}
