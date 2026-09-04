import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Image, Item } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  };

  state = {
    isModalShown: false,
  };

  showModal = () => {
    this.setState({ isModalShown: true });
  };

  closeModal = () => {
    this.setState({ isModalShown: false });
  };

  render() {
    const { isModalShown } = this.state;
    const { webformatURL, name, largeImageURL } = this.props.item;
    const { showModal, closeModal } = this;
    return (
      <>
        <Item>
          <Image src={webformatURL} alt={name} onClick={showModal} />
        </Item>
        {isModalShown && (
          <Modal image={largeImageURL} name={name} onCloseModal={closeModal} />
        )}
      </>
    );
  }
}
