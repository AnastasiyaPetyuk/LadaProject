@isTest
private class ContactControllerTest {
    @isTest
    static void testCreateContactWithProductOpportunity() {
        String lastName = 'Doe';
        String firstName = 'John';
        String email = 'john.doe@example.com';
        String phone = '1234567890';
        String carName = 'Car Model';
        String carEquipment = 'Car Equipment';

        Contact testContact = new Contact(LastName = lastName, FirstName = firstName, Email = email, Phone = phone);
        insert testContact;

        Contact insertedContact = [SELECT Id, LastName, FirstName, Email, Phone FROM Contact WHERE LastName = :lastName AND FirstName = :firstName];
        System.assertEquals(lastName, insertedContact.LastName);
        System.assertEquals(firstName, insertedContact.FirstName);
        System.assertEquals(email, insertedContact.Email);
        System.assertEquals(phone, insertedContact.Phone);

        Opportunity testOpportunity = new Opportunity(
            Name = lastName + ' ' + firstName + ', ' + carName,
            CloseDate = Date.today().addDays(30),
            StageName = 'Configuration And Customization',
            LeadSource = 'Web',
            ContactId = insertedContact.Id
        );
        insert testOpportunity;

        Opportunity insertedOpportunity = [SELECT Id, Name, CloseDate, StageName, LeadSource FROM Opportunity WHERE Name = :testOpportunity.Name];
        System.assertEquals(testOpportunity.Name, insertedOpportunity.Name);
        System.assertEquals(testOpportunity.CloseDate, insertedOpportunity.CloseDate);
        System.assertEquals(testOpportunity.StageName, insertedOpportunity.StageName);
        System.assertEquals(testOpportunity.LeadSource, insertedOpportunity.LeadSource);

        Pricebook2 testPricebook = new Pricebook2(Name = carEquipment);
        insert testPricebook;

        Product2 testProduct = new Product2(Name = carName);
        insert testProduct;

        PricebookEntry testPricebookEntry = new PricebookEntry(
            Pricebook2Id = testPricebook.Id,
            Product2Id = testProduct.Id,
            UnitPrice = 100.00
        );
        insert testPricebookEntry;

        Test.startTest();
        ContactController.createContactWithProductOpportunity(
            lastName, firstName, email, phone, carName, carEquipment
        );
        Test.stopTest();

        OpportunityLineItem insertedOpportunityLineItem = [SELECT Id FROM OpportunityLineItem WHERE OpportunityId = :insertedOpportunity.Id];
        System.assertNotEquals(null, insertedOpportunityLineItem);
        System.assertEquals(1, insertedOpportunityLineItem.Quantity);
        System.assertEquals(testPricebookEntry.UnitPrice, insertedOpportunityLineItem.UnitPrice);
    }
}
