public with sharing class PDFController {
  @AuraEnabled
  public static String generatePDF(String productName, String selectedCurrency) {
    Blob pdfBlob = generatePDFBlob(selectedCurrency, productName);
    String base64String = EncodingUtil.base64Encode(pdfBlob);
    return base64String;
  }

  private static Blob generatePDFBlob(String selectedCurrency, String productName) {
    String pdfContent= 'CAR DETAILS AND PRICES \n';
    
    Product2 selectedProduct = ProductDataRetriever.getProductByName(productname);

    pdfContent += selectedProduct.Name +'\n' +
          selectedProduct.Year__c + '\r\n Checkpoint:' +
          selectedProduct.Checkpoint__c + '\r\n Drive Unit:' +
          selectedProduct.DriveUnit__c + '\r\n Car Body:' +
          selectedProduct.Body__C + '\r\n' +
          selectedProduct.Description;

    return Blob.toPDF(pdfContent);
  }
}
