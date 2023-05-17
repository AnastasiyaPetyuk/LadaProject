public class CurrencyConversionSchedulable implements Schedulable {
  public void execute(SchedulableContext context) {
    CurrencyConversionFuture.fetchAndStoreExchangeRates();
  }
}
