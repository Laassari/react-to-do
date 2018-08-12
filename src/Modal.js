import React from 'react';

const Modal = props => {
  const styles = {
    color: 'red',
    fontWeight: 800
  };
  return <p style={styles}>{props.textError}</p>;
};

//textError = 'an error happened'
Modal.defaultProps = {
  textError: 'An error occured!'
};
export default Modal;
