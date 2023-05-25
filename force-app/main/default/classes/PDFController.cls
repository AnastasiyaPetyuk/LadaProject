public with sharing class PDFController {
  @AuraEnabled
  public static String generatePDF(String productName, String selectedCurrency) {
    Blob pdfBlob = generatePDFBlob(selectedCurrency, productName);
    String base64String = EncodingUtil.base64Encode(pdfBlob);
    return base64String;
  }

  private static Blob generatePDFBlob (String selectedCurrency, String productName) {
    String pdfContent = 'CAR DETAILS AND PRICES <br/><br/>';
    Product2 selectedProduct = ProductDataRetriever.getProductByName(
      productname
    );
    String prices = '';

    Decimal currencyCoefficient = 1;
    if (selectedCurrency == 'BYN') {
      Exchange_Rate__c rate = [
        SELECT Coefficient__c
        FROM Exchange_Rate__c
        WHERE Name = 'USD'
        LIMIT 1
      ];
      currencyCoefficient = rate.Coefficient__c;
    }

    List<PricebookEntry> priceBooks = PriceBookEntryDataRetriever.getAllPriceBookEntriesByProductName(productName);
    for (PricebookEntry priceBook : priceBooks) {
      prices +=
        priceBook.PriceBook2.Name +
        ': ' +
        (priceBook.UnitPrice * currencyCoefficient) +
        ' ' +
        selectedCurrency +
        '<br/>';
    }

    pdfContent +=
      selectedProduct.Name +
      '<br/><br/>' +
      selectedProduct.Year__c +
      '<br/>Checkpoint: ' +
      selectedProduct.Checkpoint__c +
      '<br/>Drive Unit: ' +
      selectedProduct.DriveUnit__c +
      '<br/>Car Body: ' +
      selectedProduct.Body__C +
      '<br/><br/>' +
      selectedProduct.Description +
      '<br/><br/>' +
      'CURRENCY:<br/>' +
      prices;

    return Blob.toPDF(pdfContent);
  }
}
