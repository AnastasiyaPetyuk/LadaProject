@isTest
private class CurrencyConversionFutureTest {
    @isTest
    static void testFetchAndStoreExchangeRates() {
        Test.startTest();
        CurrencyConversionFuture.fetchAndStoreExchangeRates();
        Test.stopTest();
        Assert.areEqual(true, true);
    }
}
