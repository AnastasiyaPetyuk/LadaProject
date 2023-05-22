import { LightningElement, wire, api} from 'lwc';
import getProductList from '@salesforce/apex/ProductController.getProductList';
import AvailableCarModels from '@salesforce/label/c.availableCarModels';
import ViewDetails from '@salesforce/label/c.viewDetails';
import CarDetails from '@salesforce/label/c.carDetails';
import productDetails from 'c/productDetails';
import orderTestDriveForm from 'c/orderTestDriveForm';
import buyAutoForm from 'c/buyAutoForm';


export default class ProductList extends LightningElement {
    label = {
        AvailableCarModels,
        ViewDetails,
        CarDetails
    };

    result;
    productData;
    selectedProduct;

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
                body: product.Body__c,
                checkpoint: product.Checkpoint__c,
                driveUnit: product.DriveUnit__c,
                description: product.Description
            }));
        } else if (error) {
            console.error(error);
        }
    }

    async handleShowModal(event) {
        const productId = event.target.dataset.id;
        this.selectedProduct = this.productData.find(product => product.id === productId);
        this.result = await productDetails.open({
            size: 'large',
            headerText: CarDetails,
            carName: this.selectedProduct.name, 
            carYear: this.selectedProduct.year,
            carImage: this.selectedProduct.image_url,
            carBody: this.selectedProduct.body,
            carCheckpoint: this.selectedProduct.checkpoint,
            carDriveUnit: this.selectedProduct.driveUnit,
            carDescription: this.selectedProduct.description,
        });
    }


    async handleOrderTestDrive(event) {
        const productId = event.target.dataset.id;
        this.selectedProduct = this.productData.find(product => product.id === productId);
        this.result = await orderTestDriveForm.open({
            carName: this.selectedProduct.name, 
        });
    }

    async handleBuy(event) {
        const productId = event.target.dataset.id;
        this.selectedProduct = this.productData.find(product => product.id === productId);
        this.result = await buyAutoForm.open({
            carName: this.selectedProduct.name, 
        });
    }
}
