import { LightningElement, wire} from 'lwc';
import getProductList from '@salesforce/apex/ProductController.getProductList';
import AvailableCarModels from '@salesforce/label/c.availableCarModels';
import ViewDetails from '@salesforce/label/c.viewDetails';
import CarDetails from '@salesforce/label/c.carDetails';
import OrderTestDrive from '@salesforce/label/c.orderTestDrive'
import Buy from '@salesforce/label/c.buy';
import productDetails from 'c/productDetails';
import orderTestDriveForm from 'c/orderTestDriveForm';
import buyAutoForm from 'c/buyAutoForm';
import { registerListener, unregisterAllListeners } from 'c/pubSubConnector';
import { CurrentPageReference } from 'lightning/navigation';

export default class ProductList extends LightningElement {
    label = {
        AvailableCarModels,
        ViewDetails,
        CarDetails,
        OrderTestDrive,
        Buy
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

    selectedCurrency = '';
    @wire(CurrentPageReference) pageRef;
      
    connectedCallback() {
      registerListener('EventFromPub', this.setCaptureText, this);
    }
  
    disconnectedCallback() {
      unregisterAllListeners(this);
    }
  
    setCaptureText(objPayload) {
        this.selectedCurrency = objPayload;
    }
      

    async handleShowModal(event) {
        console.log('selectedCurrency handle modal: ' + this.selectedCurrency);
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
            currency: this.selectedCurrency
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
