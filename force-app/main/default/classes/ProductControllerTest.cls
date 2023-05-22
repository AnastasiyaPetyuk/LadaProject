@IsTest
private class ProductControllerTest {
    @IsTest
    static void testGetProductList() {
        Product2 testProduct1 = new Product2(Name = 'Test Product1',
            Year__c = 2023,
            Checkpoint__c = 'automatic',
            DriveUnit__c = 'front',
            Body__c = 'SUV',
            Image_URL__c = 'some url',
            Description = 'Test Description');
        Product2 testProduct2 = new Product2(Name = 'Test Product2',
            Year__c = 2023,
            Checkpoint__c = 'automatic',
            DriveUnit__c = 'front',
            Body__c = 'SUV',
            Description = 'Test Description');
        List<Product2> testProducts = new List<Product2>{testProduct1, testProduct2};
        insert testProducts;

        Test.startTest();
        List<Product2> productList = ProductController.getProductList();
        Test.stopTest();

        System.assertEquals(2, productList.size(), 'Two products should be returned');
        System.assertEquals('Test Product1', productList[0].Name, 'First product name should match');
        System.assertEquals('Test Product2', productList[1].Name, 'Second product name should match');
    }
}
