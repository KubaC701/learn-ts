import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Props from './BaseModal.types';

import './BaseModal.scss';

const BaseModal = ({
  className,
  children,
  heading,
  setIsOpen,
  rootElement,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    ({ target }) => {
      if (!ref.current) {
        return;
      }
      const isClickInside = ref.current.contains(target);

      if (!isClickInside) {
        setIsOpen(false);
      }
    },
    [ref, setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return createPortal(
    <div className="base-modal">
      <div className="base-modal__overlay">
        <div ref={ref} className={`base-modal__body ${className}`}>
          <div className="base-modal__header">
            <h1 className="base-modal__heading">{heading}</h1>
            <button className="base-modal__close" onClick={() => setIsOpen(false)} type="button">
              <img alt="" className="base-modal__close-icon" src="/icons/close.svg" />
            </button>
          </div>
          <div className="base-modal__content">{children}</div>
        </div>
      </div>
    </div>,
    rootElement
  );
};

BaseModal.defaultProps = {
  heading: '',
  rootElement: document.getElementById('modal-root'),
};

export default BaseModal;
