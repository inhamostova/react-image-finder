import axios from 'axios';

const API_KEY = '31781224-f2235db9c919ebb7ef96866ff';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const resp = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return resp.data;
}
