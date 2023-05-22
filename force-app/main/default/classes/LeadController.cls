public with sharing class LeadController {
    @AuraEnabled
    public static void createLead(String lastName, String firstName, String email, String phone, String title) {
        Lead newLead = new Lead(LastName = lastName, FirstName = firstName, Email = email, Phone = phone, Title = title, Company = 'none');
        insert newLead;
    }
}