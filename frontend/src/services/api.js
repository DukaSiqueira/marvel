import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

const marvel = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
    params: {
        apikey: import.meta.env.VITE_MARVEL_API_KEY,
        hash: import.meta.env.VITE_MARVEL_HASH,
        ts: import.meta.env.VITE_MARVEL_TS,
    },
});

export { api, marvel };