public with sharing class CurrencyConversionFuture {
  @future(callout=true)
  public static void fetchAndStoreExchangeRates() {
    Date todayDate = Date.today();
    HttpRequest request = new HttpRequest();
    request.setEndpoint('https://api.nbrb.by/exrates/rates/USD?parammode=2');
    request.setMethod('GET');

    HttpResponse response = new Http().send(request);

    if (response.getStatusCode() == 200) {
      List<Object> exchangeRates = (List<Object>) JSON.deserializeUntyped(
        response.getBody()
      );

      Cur_OfficialRate_USD__c curOfficialRateUSD = Cur_OfficialRate_USD__c.getOrgDefaults();

      for (Object rate : exchangeRates) {
        Map<String, Object> rateMap = (Map<String, Object>) rate;
        Decimal conversionRate = (Decimal) rateMap.get('Cur_OfficialRate');

        curOfficialRateUSD.value__c = conversionRate;
      }

      update curOfficialRateUSD;
    } else {
      System.debug(
        'API Error: ' + response.getStatusCode() + ' ' + response.getStatus()
      );
    }
  }
}
