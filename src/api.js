import axios from 'axios';

// create axios instance
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        "api_key": "62f80056c46f85043f783c976a0a62a6",
        "language": "en-US"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upComing: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) => api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("search/movie", {
        params: encodeURIComponent(term)
    })
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    tvDetail: (id) => api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("search/tv", {
        params: encodeURIComponent(term)
    })
};