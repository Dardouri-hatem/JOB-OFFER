import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { message } from "antd";

function ModalConfirm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    props.confirm();
    handleClose();

    message.warning(`Account Removed !!!`);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Are you sure to remove your account !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
