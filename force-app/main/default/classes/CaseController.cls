public with sharing class CaseController {
  @AuraEnabled
  public static void createCase(
    String name,
    String subject,
    String email,
    String phone,
    String question
  ) {
    Case newCase = new Case(
      Name__c = name,
      Subject = subject,
      SuppliedEmail = email,
      Status = 'New',
      Origin = 'Web',
      Phone__c = phone,
      Description = question
    );

    insert newCase;
  }
}
