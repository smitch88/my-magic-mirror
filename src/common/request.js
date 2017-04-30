import 'whatwg-fetch';

const checkStatus = (response) => {
  const status = response.status;
  if (status >= 200 && status < 400) {
    return response[status === 204 ? 'text' : 'json']();
  } else if (status === 401) {
    throw new Error('Unauthorized');
  } else {
    // 500 errors
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export default function request(url, options) {
  return (
    fetch(url, options)
      .then(checkStatus)
  );
}
