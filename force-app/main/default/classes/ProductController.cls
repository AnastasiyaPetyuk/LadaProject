public with sharing class ProductController {
  @AuraEnabled(cacheable=true)
  public static List<Product2> getProductList() {
    return ProductDataRetriever.getAllDataFromAllProducts();
  }
}
