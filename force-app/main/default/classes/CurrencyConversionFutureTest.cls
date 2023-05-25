@isTest
private class CurrencyConversionFutureTest {
  @isTest
  static void testFetchAndStoreExchangeRates() {
    String mockResponse = '{"Cur_Abbreviation": "USD","Cur_OfficialRate": "2.0"}';
    Test.setMock(
      HttpCalloutMock.class,
      new MockHttpResponse('200', mockResponse)
    );

    Test.startTest();
    CurrencyConversionFuture.fetchAndStoreExchangeRates();
    Test.stopTest();

    Exchange_Rate__c rateUSD = [
      SELECT Coefficient__c
      FROM Exchange_Rate__c
      WHERE Name = 'USD'
      LIMIT 1
    ];

    System.assertEquals(2.0, rateUSD.Coefficient__c);
  }
}
