@IsTest
private class CaseControllerTest {
    @IsTest
    static void testCreateCase() {
        String name = 'John Doe';
        String email = 'johndoe@example.com';
        String phone = '1234567890';
        String question = 'This is a test question';
        
        Test.startTest();
        CaseController.createCase(name, email, phone, question);
        Test.stopTest();
        
        List<Case> cases = [SELECT Name__c, SuppliedEmail, Status, Origin, Phone__c, Description
                            FROM Case WHERE Name__c = :name];
        
        System.assertEquals(1, cases.size(), 'One case should be created');
        Case createdCase = cases[0];
        System.assertEquals(name, createdCase.Name__c, 'Case Name should match');
        System.assertEquals(email, createdCase.SuppliedEmail, 'Case Email should match');
        System.assertEquals('New', createdCase.Status, 'Case Status should be New');
        System.assertEquals('Web', createdCase.Origin, 'Case Origin should be Web');
        System.assertEquals(phone, createdCase.Phone__c, 'Case Phone should match');
        System.assertEquals(question, createdCase.Description, 'Case Description should match');
    }
}
