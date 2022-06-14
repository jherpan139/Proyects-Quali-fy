import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Carousel from 'react-bootstrap/Carousel'

function QualifyAsTutorModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Notas de {props.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>Salir</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default QualifyAsTutorModal