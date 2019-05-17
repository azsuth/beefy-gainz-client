import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL || '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const setIdToken = (idToken) => {
    axios.defaults.headers.common['idToken'] = idToken;
}