public with sharing class ProductDataRetriever {
  public static List<Product2> getAllDataFromAllProducts() {
    return [
      SELECT
        Name,
        ProductCode,
        Year__c,
        Image_URL__c,
        Checkpoint__c,
        DriveUnit__c,
        Body__c,
        Description
      FROM Product2
    ];
  }

  public static Product2 getProductByName(String name) {
    return [
      SELECT
        Name,
        ProductCode,
        Year__c,
        Image_URL__c,
        Checkpoint__c,
        DriveUnit__c,
        Body__c,
        Description
      FROM Product2 
      WHERE Product2.Name = :name AND IsActive = true
      LIMIT 1
    ];  
  }
}
