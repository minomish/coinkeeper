import axios from 'axios'; //  библиотека для отправки HTTP-запросов
//чтобы работать с сервером

const axiosInstance = axios.create({ // создаем копию axios
    baseURL: 'http://localhost:3001', 
});

export default axiosInstance;
