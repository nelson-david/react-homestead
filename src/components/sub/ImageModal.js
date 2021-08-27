import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Carousel } from "react-bootstrap";

import * as MdIcons from "react-icons/md";

function ImageModal(props){
  const [modalIsOpen,setIsOpen] = useState(true);

  function closeModal(){
    props.resetImgSRC();
    setIsOpen(false);
  }

  Modal.setAppElement('#root');

  useEffect(() => {
    console.log(props)
  }, [props])

  return (
    <div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="preview_modal"
          overlayClassName="preview_modal_overlay"
          closeTimeoutMS={500}
        >
        <MdIcons.MdCancel
          onClick={closeModal}
          className="float-right"
          style={{
            marginBottom: "6px",
            color: "white",
            cursor: "pointer"
          }}
        />
        <br />
        <Carousel
          activeIndex={parseInt(props.indexToStart)}
          onSelect={props.handleSelect}
        >
          {
            props.images.map((value, index) => {
              return (
                <Carousel.Item
                  key={index}
                >
                  <img
                    className="img-fluid preview_modal_img"
                    src={value}
                    alt="value"
                  />
                </Carousel.Item>
              )
            })
          }
        </Carousel>
      </Modal>
    </div>
  );
}

export default ImageModal;