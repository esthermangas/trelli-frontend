import React, { useEffect, useRef } from 'react';
import { Icon, Text } from 'esther-components';
import styles from './modal.module.css';

const Modal = (props) => {
  const ref = useRef(null);
  const { children, open, onClose, title } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (onClose !== undefined) {
          onClose();
        }
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <>
      {open && (
        <div className={styles.modalRoot}>
          <div className={styles.modalContainer} ref={ref}>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Text>{title}</Text>
              </div>
              <span className={styles.iconCross} onClick={onClose}>
                <Icon color="sky" size="36px" name="cross" />
              </span>
            </div>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
