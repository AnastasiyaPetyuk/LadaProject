@IsTest
private class PriceBookEntryDataRetrieverTest {
  @IsTest
  static void testGetAllPriceBookEntriesByProductName() {
    String productName = 'Test Product';
    Product2 testProduct = new Product2(
      Name = 'Test Product',
      Year__c = 2023,
      Checkpoint__c = 'automatic',
      DriveUnit__c = 'front',
      Body__c = 'SUV',
      Description = 'Test Description',
      Image_URL__c = 'some url',
      IsActive = true
    );
    insert testProduct;

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

    PricebookEntry testPricebookEntry1 = new PricebookEntry(
      Pricebook2Id = standardPricebook.Id,
      Product2Id = testProduct.Id,
      IsActive = true,
      UnitPrice = 1000
    );
    insert testPricebookEntry1;

    Test.startTest();
    List<PricebookEntry> priceBookEntries = PriceBookEntryDataRetriever.getAllPriceBookEntriesByProductName(
      productName
    );
    Test.stopTest();

    System.assertEquals(
      1,
      priceBookEntries.size(),
      'One active price book entry should be returned'
    );
    PricebookEntry retrievedEntry = priceBookEntries[0];
    System.assertEquals(
      'Test Product',
      retrievedEntry.Product2.Name,
      'Product name should match'
    );
    System.assertEquals(
      true,
      retrievedEntry.IsActive,
      'Price book entry should be active'
    );
    System.assertEquals(
      1000,
      retrievedEntry.UnitPrice,
      'Unit price should match'
    );
  }

  @IsTest
  static void testFindPricebookEntry() {
    Pricebook2 testPricebook = new Pricebook2(Name = 'test pricebook');
    insert testPricebook;

    Product2 testProduct = new Product2(
      Name = 'Test Product',
      Year__c = 2023,
      Checkpoint__c = 'automatic',
      DriveUnit__c = 'front',
      Body__c = 'SUV',
      Description = 'Test Description',
      Image_URL__c = 'some url',
      IsActive = true
    );
    insert testProduct;

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

    PricebookEntry testPricebookEntry1 = new PricebookEntry(
      Pricebook2Id = standardPricebook.Id,
      Product2Id = testProduct.Id,
      IsActive = true,
      UnitPrice = 1000
    );
    insert testPricebookEntry1;

    Test.startTest();
    List<PricebookEntry> priceBookEntries = PriceBookEntryDataRetriever.findPricebookEntry(
      standardPricebook.Id,
      testProduct.Id
    );
    Test.stopTest();

    System.assertEquals(
      1,
      priceBookEntries.size(),
      'One price book entry should be returned'
    );
    PricebookEntry retrievedEntry = priceBookEntries[0];
    System.assertEquals(
      testPricebookEntry1.Id,
      retrievedEntry.Id,
      'Retrieved entry ID should match the inserted entry ID'
    );
  }
}
