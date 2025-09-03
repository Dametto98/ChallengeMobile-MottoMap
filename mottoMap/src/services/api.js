import axios from 'axios';

const API_JAVA_URL = ''; 

const apiJava = axios.create({
  baseURL: API_JAVA_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiJava };