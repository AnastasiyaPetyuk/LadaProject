public with sharing class CaseController {
    @AuraEnabled
    public static void createCase(String name, String email, String phone, String question){
        Case newCase = new Case(
            Name__c=name, 
            SuppliedEmail = email, 
            Status='New', 
            Origin='Web', 
            Phone__c=phone, 
            Description=question
        );

        insert newCase; 
    }
}

