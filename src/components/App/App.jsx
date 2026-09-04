import { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { fetchImages } from 'services/serviceAPI';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showBtn: false,
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        this.setState({ images: [], error: null, isLoading: true });

        const { hits } = await fetchImages(
          this.state.searchQuery,
          this.state.page
        );

        if (hits.length === 0) {
          throw new Error('Incorrect name!!!');
        }

        this.setState({ isLoading: false });

        this.setState({ images: hits, showBtn: true });
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      try {
        this.setState({ isLoading: true, error: null });
        const { hits, totalHits } = await fetchImages(
          this.state.searchQuery,
          this.state.page
        );

        if (this.state.page * hits.length >= totalHits) {
          this.setState({ showBtn: false });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } catch (error) {
        this.setState({ error: 'Oops, something goes wrong!' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setSearchQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
    });
  };

  increasePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, showBtn, isLoading, error } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.setSearchQuery} />
        <RotatingLines
          visible={isLoading && !images.length}
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{ margin: '0 auto' }}
        />
        {error ? (
          <p style={{ color: 'orangered', margin: '0 auto' }}>{error}</p>
        ) : (
          <>
            <ImageGallery items={images} />
            <RotatingLines
              visible={isLoading && images.length}
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{ margin: '0 auto' }}
            />

            {showBtn && !!images.length && (
              <Button onClick={this.increasePage} />
            )}
          </>
        )}
      </Container>
    );
  }
}
