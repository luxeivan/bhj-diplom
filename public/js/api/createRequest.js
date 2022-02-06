/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    //Ожидание ответа
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.response.success) {
                options.callback(null, xhr.response);
            } else {
                options.callback(xhr.response.error);
            }
        };
    };
    //Если метод GET
    if (options.method === 'GET') {
        let paramText = '';
        if (options.data) {
            paramText += '?';
            for (const key in options.data) {
                paramText += key + '=' + options.data[key] + '&';
            }
            paramText = paramText.slice(0, -1);
        }
        xhr.open(options.method, options.url + paramText);
        xhr.send();
        //Если метод не GET
    } else {
        const formData = new FormData;
        for (const key in options.data) {
            formData.append(key, options.data[key]);
        }
        xhr.open(options.method, options.url);
        xhr.send(formData);
    }
};
