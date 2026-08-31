import { Modal } from 'components/Modal/Modal';
import { Image, Item } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    image: '',
    isModalShown: false,
  };

  showModal = () => {
    this.setState({ isModalShown: true, image: this.props.item.largeImageURL });
  };

  closeModal = () => {
    this.setState({ isModalShown: false });
  };

  render() {
    const { image, isModalShown } = this.state;
    const { webformatURL, name } = this.props.item;
    const { showModal, closeModal } = this;
    return (
      <>
        <Item>
          <Image src={webformatURL} alt={name} onClick={showModal} />
        </Item>
        {isModalShown && (
          <Modal image={image} name={name} onCloseModal={closeModal} />
        )}
      </>
    );
  }
}
