import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const ConfirmModal = ({ isOpen, toggle, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Confirm</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onConfirm}>
          Yes
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;