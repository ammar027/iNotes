import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(); // Close the alert after 3 seconds
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'info':
        return faInfoCircle;
      case 'error':
        return faExclamationCircle;
      default:
        return null;
    }
  };

  return (
    <div className={`alert alert-${type}`}>
      <FontAwesomeIcon icon={getIcon()} className="alert-icon mx-1" />
      <span>{message}</span>
      <button className="alert-close" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Alert;
