import axios from 'axios';

axios.defaults.baseURL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://34.66.151.72:8080';


export const apiNoToken = async (url, method, data) => {

    const body = await axios({
        url, method, data
    })
    return body
}