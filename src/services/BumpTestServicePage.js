const successCaseCode = [200, 201];

const _fetchServiceBumpTestData = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
    const END_POINT = 'https://varmatrix.com/Aqms/';
    const body = { body: JSON.stringify(data) };
  
    const bodyParameters = {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      ...body,
    };
  
    const bodyObject = {
      method: serviceMethod,
      ...bodyParameters,
    };
  
    return fetch(END_POINT + PATH, bodyObject)
      .then((response) => {
        if (successCaseCode.indexOf(response.status) > -1) {
          return response.json();
        }
        // eslint-disable-next-line no-throw-literal
        throw {
          errorStatus: response.status,
          errorObject: response.json(),
        };
      })
      .then((dataResponse) => successCallback(dataResponse))
      .catch((error) => {
        error.errorObject.then((errorResponse) => {
          const errorMessage = errorResponse.error ? errorResponse.error : errorResponse.message;
          errorCallBack(error.errorStatus, errorMessage);
        });
      });
  };

export const BumpTestData = (data, successCallback, errorCallBack) => _fetchServiceBumpTestData('AQMS_DATA_EXTRACTION_CRON/aqms_data_extraction.php', 'POST', data, successCallback, errorCallBack);
