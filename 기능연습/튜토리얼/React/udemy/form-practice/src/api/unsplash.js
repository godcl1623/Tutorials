import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID zxsZLdtL3jZXoL1milECnoWQS6cFXq8AVao7LOAe0jA'
  }
});
