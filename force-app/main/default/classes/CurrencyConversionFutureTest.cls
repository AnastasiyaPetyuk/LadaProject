@isTest
private class CurrencyConversionFutureTest {
  @isTest
  static void testFetchAndStoreExchangeRates() {
    String mockResponse = '{"Cur_Abbreviation": "USD","Cur_OfficialRate": 2.0}';
    Test.setMock(
      HttpCalloutMock.class,
      new MockHttpResponse('200', mockResponse)
    );

    Test.startTest();
    CurrencyConversionFuture.fetchAndStoreExchangeRates();
    Test.stopTest();

    Cur_OfficialRate_USD__c curOfficialRateUSD = Cur_OfficialRate_USD__c.getOrgDefaults();

    System.assertEquals(2.0, curOfficialRateUSD.value__c);
  }
}
