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
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ images: [] });
      this.setState({ isLoading: true });
      const { hits } = await fetchImages(
        this.state.searchQuery,
        this.state.page
      );

      this.setState({ isLoading: false });

      this.setState({ images: hits, showBtn: true });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await fetchImages(
        this.state.searchQuery,
        this.state.page
      );
      this.setState({ isLoading: false });

      if (this.state.page * hits.length >= totalHits) {
        this.setState({ showBtn: false });
      }

      this.setState(prevState => ({ images: [...prevState.images, ...hits] }));
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
    const { images, showBtn, isLoading } = this.state;
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
        (
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
          {showBtn && images.length && <Button onClick={this.increasePage} />}
        </>
        )
      </Container>
    );
  }
}
