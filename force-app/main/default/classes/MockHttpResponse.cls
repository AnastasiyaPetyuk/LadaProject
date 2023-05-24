@isTest
public class MockHttpResponse implements HttpCalloutMock {
  private String status;
  private String responseBody;

  public MockHttpResponse(String status, String responseBody) {
    this.status = status;
    this.responseBody = responseBody;
  }

  public HttpResponse respond(HTTPRequest request) {
    HttpResponse response = new HttpResponse();
    response.setHeader('Content-Type', 'application/json');
    response.setStatusCode(Integer.valueOf(status));
    response.setBody(responseBody);
    return response;
  }
}
