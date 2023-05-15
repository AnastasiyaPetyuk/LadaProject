public with sharing class AutomotiveCenterController {
  @AuraEnabled(cacheable=true scope='global')
  public static Automotive_Center__c[] getAllAutomotiveCenters() {
    return [
      SELECT Id, Name, City__c, Phone__c, Type__c, Working_Hours__c
      FROM Automotive_Center__c
      ORDER BY Name ASC
      LIMIT 50
    ];
  }

  @AuraEnabled(cacheable=true scope='global')
  public static Automotive_Center__c[] searchAutomotiveCenters(
    String searchTerm
  ) {
    searchTerm = searchTerm.trim();
    if (searchTerm == '') {
      return getAllAutomotiveCenters();
    }
    searchTerm = '%' + searchTerm + '%';
    return [
      SELECT Id, Name, City__c, Phone__c, Type__c, Working_Hours__c
      FROM Automotive_Center__c
      WHERE Name LIKE :searchTerm OR City__c LIKE :searchTerm
      ORDER BY Name ASC
      LIMIT 50
    ];
  }
}
