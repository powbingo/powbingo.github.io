import React, { useEffect, useRef } from 'react';
import { Carousel, Modal } from 'antd';

import './ScreenshotModal.css';

export default function ScreenshotModal({
  visible,
  onClose,
  tile
}) {
  const ref = useRef();

  useEffect(() => {
    console.log('here', visible);
    const onKeypress = (event) => {
      if (event.code === 'ArrowRight') ref.current.next();
      else if (event.code === 'ArrowLeft') ref.current.prev();
    };

    if (!visible || !ref?.current) {
      return () => {
        window.removeEventListener('keydown', onKeypress);
      }
    }

    window.addEventListener('keydown', onKeypress);
  }, [visible, ref?.current]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      className="screenshot-modal"
      closeIcon={null}
    >
      <Carousel
        ref={ref}
        arrows={true}
        style={{ padding: 50, width: 1200, height: 'auto' }}
        mask={false}
      >
        {tile?.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="screenshot"
            className="screenshot-image"
          />
        ))}
      </Carousel>
    </Modal>
  );
}
