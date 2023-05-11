public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductList() {
        return [
            SELECT Id, 
                Name, 
                ProductCode, 
                Edition__c, 
                Year__c, 
                Image_URL__c, 
                Description 
            FROM Product2];
    }
}
 