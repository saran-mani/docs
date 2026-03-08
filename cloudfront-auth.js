function handler(event) {
  var request = event.request;
  var headers = request.headers;

  var authString = "Basic BASIC_AUTH_PLACEHOLDER";

  if (!headers.authorization || headers.authorization.value !== authString) {
    return {
      statusCode: 401,
      statusDescription: "Unauthorized",
      headers: {
        "www-authenticate": { value: 'Basic realm="Internal"' }
      }
    };
  }

  return request;
}