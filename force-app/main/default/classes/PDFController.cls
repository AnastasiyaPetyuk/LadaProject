public with sharing class PDFController {
    @AuraEnabled
    public static void generateAndDownloadPDF(String product, String currencySetting, String language) {
        // Generate the PDF content
        String pdfContent = generatePDFContent(product, currencySetting, language);
        
        // Set the response content type and headers
        Blob pdfBlob = Blob.valueOf(pdfContent);
        String fileName = 'product_details.pdf';
        String contentType = 'application/pdf';
        
        // Trigger the file download
        downloadPDF(pdfBlob, fileName, contentType);
    }
    
    private static String generatePDFContent(String product, String currencySetting, String language) {
        // Generate the PDF content based on the product, currencySetting, and language parameters
        // You can use methods like PageReference's getContent() or Visualforce rendering to generate the PDF content dynamically
        
        // Sample code to generate PDF content (replace with your actual logic)
        String pdfContent = 'Product Name: ' + product + '\n';
        pdfContent += 'Price: ' + currencySetting + ' '  /* + String.valueOf(product.Price__c) */+ '\n';
        pdfContent += 'Language: ' + language + '\n';
        
        return pdfContent;
    }
    
    private static void downloadPDF(Blob pdfBlob, String fileName, String contentType) {
        // Set the response headers for file download
        RestContext.response.addHeader('Content-Disposition', 'attachment; filename=' + fileName);
        RestContext.response.addHeader('Content-Type', contentType);
        RestContext.response.addHeader('Content-Length', String.valueOf(pdfBlob.size()));
        
        // Send the PDF content in the response
        RestContext.response.responseBody = pdfBlob;
    }
}