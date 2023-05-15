global class NationalBankCurrencyConversion implements Schedulable {

    global void execute(SchedulableContext sc) {
        // Get the currency exchange rates from the National Bank API
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://www.nbrb.by/api/exrates/rates?periodicity=0');
        request.setMethod('GET');
        Http http = new Http();
        HttpResponse response = http.send(request);

        // Parse the response JSON and update the custom object with the exchange rates
        List<Object> rates = (List<Object>) JSON.deserializeUntyped(response.getBody());
        List<Currency_Exchange_Rate__c> exchangeRates = new List<Currency_Exchange_Rate__c>();
        for (Object rate : rates) {
            Map<String, Object> rateMap = (Map<String, Object>) rate;
            String currencyCode = (String) rateMap.get('Cur_Abbreviation');
            Decimal exchangeRate = (Decimal) rateMap.get('Cur_OfficialRate');
            Currency_Exchange_Rate__c exchangeRateRecord = new Currency_Exchange_Rate__c(
                Currency_Code__c = currencyCode,
                Exchange_Rate__c = exchangeRate,
                Date__c = Date.today()
            );
            exchangeRates.add(exchangeRateRecord);
        }
        upsert exchangeRates Currency_Code__c;

        // Convert the currency values in other custom objects using the updated exchange rates
        List<Custom_Object__c> customObjects = [SELECT Amount__c, Currency_Code__c FROM Custom_Object__c];
        for (Custom_Object__c customObject : customObjects) {
            Decimal exchangeRate = [SELECT Exchange_Rate__c FROM Currency_Exchange_Rate__c WHERE Currency_Code__c = :customObject.Currency_Code__c AND Date__c = :Date.today()].Exchange_Rate__c;
            customObject.Amount_Converted__c = customObject.Amount__c * exchangeRate;
        }
        update customObjects;
    }

}
