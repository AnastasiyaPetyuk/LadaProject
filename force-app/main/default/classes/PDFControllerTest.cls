@IsTest
private class PDFControllerTest {
  @IsTest
  static void testGeneratePDF() {
    String selectedCurrency = 'USD';

    Product2 testProduct = new Product2(
      Name = 'Test Product',
      Year__c = 2023,
      Checkpoint__c = 'automatic',
      DriveUnit__c = 'front',
      Body__c = 'SUV',
      Image_URL__c = 'some url',
      Description = 'Test Description'
    );
    insert testProduct;
    String productName = testProduct.Name;

    Pricebook2 standardPricebook = new Pricebook2(
      Id = Test.getStandardPricebookId(),
      IsActive = true
    );
    update standardPricebook;

    standardPricebook = [
      SELECT Id, IsStandard
      FROM Pricebook2
      WHERE Id = :standardPricebook.Id
    ];
    System.assertEquals(true, standardPricebook.IsStandard);

    PricebookEntry testPricebookEntry = new PricebookEntry(
      Pricebook2Id = standardPricebook.Id,
      Product2Id = testProduct.Id,
      UnitPrice = 1000,
      IsActive = true
    );
    insert testPricebookEntry;

    Test.startTest();
    String base64String = PDFController.generatePDF(
      productName,
      selectedCurrency
    );
    Test.stopTest();

    System.assertNotEquals(
      null,
      base64String,
      'Base64 string should not be null'
    );

    String decodedString = EncodingUtil.base64Decode(base64String).toString();
    System.assert(
      decodedString.contains('CAR DETAILS AND PRICES'),
      'PDF content should contain CAR DETAILS AND PRICES'
    );
    System.assert(
      decodedString.contains('Test Product'),
      'PDF content should contain the product name'
    );
    System.assert(
      decodedString.contains('2023'),
      'PDF content should contain the product year'
    );
    System.assert(
      decodedString.contains('automatic'),
      'PDF content should contain the checkpoint'
    );
    System.assert(
      decodedString.contains('front'),
      'PDF content should contain the drive unit'
    );
    System.assert(
      decodedString.contains('SUV'),
      'PDF content should contain the car body'
    );
    System.assert(
      decodedString.contains('Test Description'),
      'PDF content should contain the description'
    );
    System.assert(
      decodedString.contains('USD'),
      'PDF content should contain the selected currency'
    );
    System.assert(
      decodedString.contains('Standard Price Book'),
      'PDF content should contain the price book name'
    );
    System.assert(
      decodedString.contains('1000'),
      'PDF content should contain the unit price'
    );
  }
}
