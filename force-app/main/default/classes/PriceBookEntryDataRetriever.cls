public with sharing class PriceBookEntryDataRetriever {
  public static List<PricebookEntry> getAllPriceBookEntriesByProductName(
    String productName
  ) {
    return [
      SELECT Name, Product2.Name, PriceBook2.Name, IsActive, UnitPrice
      FROM PricebookEntry
      WHERE (Product2.Name = :productName) AND (IsActive = true)
    ];
  }
}
