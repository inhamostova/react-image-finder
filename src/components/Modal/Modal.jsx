import { Component } from 'react';
import { Overlay, Container } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModalByEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalByEsc);
  }

  closeModal = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onCloseModal();
    }
  };

  closeModalByEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    const { image, name } = this.props;
    const { closeModal } = this;

    return (
      <Overlay onClick={closeModal}>
        <Container>
          <img src={image} alt={name} />
        </Container>
      </Overlay>
    );
  }
}
