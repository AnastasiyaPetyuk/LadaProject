import { LightningElement, wire} from 'lwc';
import productModalLWC from 'c/productModalLWC';
import getProductList from '@salesforce/apex/ProductController.getProductList';
import AvailableCarModels from '@salesforce/label/c.availableCarModels';
import ViewDetails from '@salesforce/label/c.viewDetails';
import CarDetails from '@salesforce/label/c.carDetails';


export default class ProductList extends LightningElement {
    showModal = true;
    result;
    label = {
        AvailableCarModels,
        ViewDetails,
        CarDetails
    };

    productData;
    selectedProduct;
    info = "";

    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Code', fieldName: 'code' },
        { label: 'Year', fieldName: 'year' }
    ];

    @wire(getProductList)
    wiredProductData({error, data}) {
        if (data) {
            this.productData = data.map((product) => ({
                id: product.Id,
                name: product.Name,
                code: product.ProductCode,
                year: product.Year__c,
                image_url: product.Image_URL__c,
                description: product.Description
            }));
        } else if (error) {
            console.error(error);
        }
    }



    async handleShowModal(event) {
        const productId = event.target.dataset.id;
        this.selectedProduct = this.productData.find(product => product.id === productId);
        this.result = await productModalLWC.open({
            size: 'large',
            headerText: CarDetails,
            carName: this.selectedProduct.name, 
            carYear: this.selectedProduct.year,
            carImage: this.selectedProduct.image_url,
            carDescription: this.selectedProduct.description
        });
    }
}
