import React from "react";

const StartGameModal = () => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    ></Modal>
  );
};

export default StartGameModal;
