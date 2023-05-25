public with sharing class CurrencyConversionFuture {
  @future(callout=true)
  public static void fetchAndStoreExchangeRates() {
    Date todayDate = Date.today();
    HttpRequest request = new HttpRequest();
    request.setEndpoint('https://api.nbrb.by/exrates/rates/USD?parammode=2');
    request.setMethod('GET');

    HttpResponse response = new Http().send(request);

    if (response.getStatusCode() == 200) {
      Map<String, Object> exchangeRate = (Map<String, Object>) JSON.deserializeUntyped(
        response.getBody()
      );

      Exchange_Rate__c rateUSD = [
        SELECT Coefficient__c
        FROM Exchange_Rate__c
        WHERE Name = 'USD'
        LIMIT 1
      ];

      rateUSD.Coefficient__c = Decimal.valueOf(String.valueOf(exchangeRate.get('Cur_OfficialRate')));
      update rateUSD;

    } else {
      System.debug(
        'API Error: ' + response.getStatusCode() + ' ' + response.getStatus()
      );
    }
  }
}
