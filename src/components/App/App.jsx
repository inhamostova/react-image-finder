import { useState, useEffect } from 'react';
import { fetchImages } from 'services/serviceAPI';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;
    async function getImages() {
      try {
        setIsLoading(true);
        setShowBtn(false);

        const { hits, totalHits } = await fetchImages(searchQuery, page);

        if (hits.length === 0) {
          throw new Error('Incorrect name!!!');
        }

        setIsLoading(false);
        setImages(prevImages => {
          const newImages = page === 1 ? [...hits] : [...prevImages, ...hits];
          setShowBtn(!(newImages.length >= totalHits));
          return newImages;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [searchQuery, page]);

  const setInitSearchQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const increasePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={setInitSearchQuery} />
      <Loader visible={isLoading && !images.length} />
      {error ? (
        <p style={{ color: 'orangered', margin: '0 auto' }}>{error}</p>
      ) : (
        <>
          <ImageGallery items={images} />
          <Loader visible={isLoading && !!images.length} />
          {showBtn && images.length && <Button onClick={increasePage} />}
        </>
      )}
    </Container>
  );
};

// export class OldApp extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     showBtn: false,
//     isLoading: false,
//     error: null,
//     totalHits: 0,
//   };

//   async componentDidUpdate(_, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       try {
//         this.setState({
//           images: [],
//           error: null,
//           isLoading: true,
//           showBtn: false,
//         });

//         const { hits, totalHits } = await fetchImages(
//           this.state.searchQuery,
//           this.state.page
//         );

//         if (hits.length === 0) {
//           throw new Error('Incorrect name!!!');
//         }

//         this.setState({
//           isLoading: false,
//           images: hits,
//           showBtn: !(hits.length >= totalHits),
//           totalHits,
//         });

//         window.scrollTo({
//           top: 0,
//           behavior: 'smooth',
//         });
//       } catch (error) {
//         this.setState({ error: error.message });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }

//     if (prevState.page !== this.state.page && this.state.page !== 1) {
//       try {
//         this.setState({ isLoading: true, error: null });
//         const { hits, totalHits } = await fetchImages(
//           this.state.searchQuery,
//           this.state.page
//         );

//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           showBtn: !(prevState.images.length + hits.length >= totalHits),
//         }));
//       } catch (error) {
//         this.setState({ error: 'Oops, something goes wrong!' });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   setSearchQuery = query => {
//     this.setState({
//       searchQuery: query,
//       page: 1,
//     });
//   };

//   increasePage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, showBtn, isLoading, error } = this.state;

//     return (
//       <Container>
//         <SearchBar onSubmit={this.setSearchQuery} />
//         <Loader visible={isLoading && !images.length} />
//         {error ? (
//           <p style={{ color: 'orangered', margin: '0 auto' }}>{error}</p>
//         ) : (
//           <>
//             <ImageGallery items={images} />
//             <Loader visible={isLoading && !!images.length} />
//             {showBtn && images.length && <Button onClick={this.increasePage} />}
//           </>
//         )}
//       </Container>
//     );
//   }
// }
