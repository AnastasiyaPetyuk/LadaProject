public with sharing class ContactController {
    @AuraEnabled
    public static void createContactWithProductOpportunity(String lastName, String firstName, String email, String phone, String carName, String carEquipment) {
        Contact newContact = new Contact(LastName = lastName, FirstName = firstName, Email = email, Phone = phone);
        insert newContact;

        Opportunity newOpportunity = new Opportunity(
            Name = lastName + ' ' + firstName + ', ' + carName,
            CloseDate = Date.today().addDays(30),
            StageName = 'Configuration And Customization',
            LeadSource = 'Web',
            ContactId = newContact.Id
        );
        insert  newOpportunity;

        Pricebook2 priceBook = [SELECT Id FROM Pricebook2 WHERE Name = :carEquipment LIMIT 1];
        Product2 product = ProductDataRetriever.getProductByName(carName);
        PricebookEntry priceBookEntry = [SELECT Id FROM PricebookEntry WHERE Pricebook2Id = :priceBook.Id AND Product2Id = :product.Id LIMIT 1];

        if (priceBook != null && product != null && priceBookEntry != null) {
            OpportunityLineItem newOpportunityLineItem = new OpportunityLineItem();
            newOpportunityLineItem.OpportunityId = newOpportunity.Id;
            newOpportunityLineItem.Product2Id = product.Id;
            newOpportunityLineItem.Quantity = 1;
            newOpportunityLineItem.UnitPrice = priceBookEntry.UnitPrice;
            insert newOpportunityLineItem;
        }
    }
}