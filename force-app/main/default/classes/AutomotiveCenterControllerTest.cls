@isTest
private class AutomotiveCenterControllerTest {
    static {
        List<Automotive_Center__c> automotiveCenters = new List<Automotive_Center__c>();
        for (Integer i = 0; i < 3; i++) {
            Automotive_Center__c center = new Automotive_Center__c(
                Name = 'Center ' + i,
                City__c = 'City ' + i,
                Phone__c = 'Phone ' + i,
                Working_Hours__c = 'Hours ' + i
            );
            automotiveCenters.add(center);
        }
        insert automotiveCenters;
    }

    @isTest
    static void testGetAllAutomotiveCenters() {
        Test.startTest();
        List<Automotive_Center__c> result = AutomotiveCenterController.getAllAutomotiveCenters();
        Test.stopTest();

        System.assertEquals(3, result.size(), 'Incorrect number of automotive centers returned');
        System.assertEquals('Center 0', result[0].Name, 'Incorrect name of the first automotive center');
    }

    @isTest
    static void testSearchAutomotiveCenters() {

        Test.startTest();
        List<Automotive_Center__c> result = AutomotiveCenterController.searchAutomotiveCenters('Center 1');
        Test.stopTest();

        System.assertEquals(1, result.size(), 'Incorrect number of automotive centers returned');
        System.assertEquals('Center 1', result[0].Name, 'Incorrect name of the automotive center');
    }
}
