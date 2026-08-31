// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
import axios from 'axios';

const API_KEY = '31781224-f2235db9c919ebb7ef96866ff';

axios.defaults.baseURL = 'https://pixabay.com/api/';

// export function fetchImages() {
//   return fetch(
//     'https://pixabay.com/api/?q=cat&page=1&key=31781224-f2235db9c919ebb7ef96866ff&image_type=photo&orientation=horizontal&per_page=12'
//   )
//     .then(resp => resp.json())
//     .then(console.log);
// }

export async function fetchImages(query, page = 1) {
  const resp = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return resp.data;
}
