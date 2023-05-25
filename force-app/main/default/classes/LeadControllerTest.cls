@IsTest
private class LeadControllerTest {
    @IsTest
    static void testCreateLead() {
        String lastName = 'Doe';
        String firstName = 'John';
        String email = 'johndoe@example.com';
        String phone = '1234567890';
        String title = 'Sales Representative';

        Test.startTest();
        LeadController.createLead(lastName, firstName, email, phone, title);
        Test.stopTest();

        List<Lead> leads = [SELECT LastName, FirstName, Email, Phone, Title, Company FROM Lead];
        System.assertEquals(1, leads.size(), 'One lead record should be created');
        Lead createdLead = leads[0];
        System.assertEquals(lastName, createdLead.LastName, 'Last name should match');
        System.assertEquals(firstName, createdLead.FirstName, 'First name should match');
        System.assertEquals(email, createdLead.Email, 'Email should match');
        System.assertEquals(phone, createdLead.Phone, 'Phone should match');
        System.assertEquals(title, createdLead.Title, 'Title should match');
        System.assertEquals('none', createdLead.Company, 'Company should be "none"');
    }
}
