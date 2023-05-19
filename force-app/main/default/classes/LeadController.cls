public with sharing class LeadController {
    @AuraEnabled
    public static void createLead(String lastName, String firstName, String email) {
        Lead newLead = new Lead(LastName = lastName, FirstName = firstName, Email = email);
        insert newLead;
    }
}