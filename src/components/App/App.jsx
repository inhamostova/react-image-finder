import { Component } from 'react';
import { fetchImages } from 'services/serviceAPI';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const { hits } = await fetchImages(this.state.searchQuery);
      this.setState({ images: hits });
    }
  }

  setSearchQuery = query => {
    this.setState({
      searchQuery: query,
    });
  };

  render() {
    const showBtn = this.state.images.length > 0;
    const { images } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.setSearchQuery} />
        <ImageGallery items={images} />
        {showBtn && <Button />}
      </Container>
    );
  }
}
