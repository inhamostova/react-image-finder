import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = ({ visible }) => {
  return (
    <RotatingLines
      visible={visible}
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{ margin: '0 auto' }}
    />
  );
};

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
