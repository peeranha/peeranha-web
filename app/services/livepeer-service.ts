import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://livepeer.studio/api/',
  headers: {
    Authorization: `Bearer ${process.env.LP_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const livepeerAPI = {
  generateUrl(name: string) {
    return instance.post('asset/request-upload', JSON.stringify({ name }));
  },
};
