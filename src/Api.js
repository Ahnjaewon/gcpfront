import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

export const api = async (url, method, data) => {
    const body = await axios({
        url,
        method,
        data,
        withCredentials: true
    });
    return body.data;
};

export const roleApi = async (url, method, data) => {
    const token = localStorage.getItem('token')
    const body = await axios({
        url, method, data,
        headers: { "Authorization": `Bearer ${token}` }
    })
    return body.data
}

export const apiNoToken = async (url, method, data) => {
    const body = await axios({
        url, method, data
    })
    return body.data
}

export const exceptionApi = async (url, method, data) => {
    const body = await axios({
        url,
        method,
        data,
        withCredentials: true
    });

    if (body.data.code !== 'OK') {
        alert(body.data.errorMsg);
    }

    return body.data;
};







