export class HTTPResponseError extends Error {
  constructor(response, ...args) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args)
    this.response = response
    this.messageResponse = {
      api: {
        url: response.url,
        type: response.statusText
      },
      status: response.status
    }

  }
}

export function checkStatusFetch(response) {
  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  } else {
    throw new HTTPResponseError(response);
  }
}

