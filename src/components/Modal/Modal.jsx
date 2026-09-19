import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Container } from './Modal.styled';

export const Modal = ({ onCloseModal, name, image }) => {
  useEffect(() => {
    const closeModalByEsc = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [onCloseModal]);

  const closeModal = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={closeModal}>
      <Container>
        <img src={image} alt={name} />
      </Container>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

// export class OldModal extends Component {
//   static propTypes = {
//     image: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     onCloseModal: PropTypes.func.isRequired,
//   };

//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModalByEsc);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModalByEsc);
//   }

//   closeModal = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onCloseModal();
//     }
//   };

//   closeModalByEsc = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   };

//   render() {
//     const { image, name } = this.props;
//     const { closeModal } = this;

//     return (
//       <Overlay onClick={closeModal}>
//         <Container>
//           <img src={image} alt={name} />
//         </Container>
//       </Overlay>
//     );
//   }
// }
