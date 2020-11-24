const API_HOSTNAME = 'http://localhost:3001';

function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  if (data instanceof Object) {
    isObject = true;
    response = data;
  } else {
    try {
      response = JSON.parse(data);
      isObject = true;
    } catch (e) {
      response = data;
    }
  }

  this.response = response;
  this.message = message;
  this.status = status;
  this.toString = () => `${this.message}\nResponse:\n${
      isObject ? JSON.stringify(this.response, null, 2) : this.response
    }`;
}

const fetchResource = (
  method,
  resource,
  options = {},
  headers = {},
  params = {},
  id,
) => {
  const token = localStorage.getItem('jwt');
  const defaultOptions = {
    mode: 'cors',
  };

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    body: JSON.stringify(options.body),
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  let url = `${API_HOSTNAME}/api/${resource}`;

  if (id) {
    url = `${url}/${id}`;
  }

  if (Object.keys(params).length > 0) {
    url = `${url}?`;

    Object.keys(params).forEach((key, index) => {
      if (index > 0) {
        url = `${url}&${key}=${params[key]}`;
      } else {
        url = `${url}${key}=${params[key]}`;
      }
    });
  }
  let response = null;
  return fetch(url, finalOptions)
    .then((responseObject) => {
      response = responseObject;
      if (response.status === 401) {
        // unauthorized
      }
      return response.json();
    })
    .then((parsedResponse) => {
      if (response.status < 200 || response.status >= 300) {
        throw parsedResponse;
      }

      return parsedResponse;
    })
    .catch((error) => {
      if (response) {
        throw new ApiError(
          `Request failed with status ${response.status}.`,
          error,
          response.status,
        );
      } else {
        throw new ApiError(error.toString(), null, 'REQUEST_FAILED');
      }
    });
};

export default { fetchResource }
;
