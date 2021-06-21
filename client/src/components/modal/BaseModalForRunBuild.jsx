import Modal from "react-modal";
import { useState } from "react";
import BaseInput from "../inputs/BaseInput.jsx";
import BaseButtonOrange from "../buttons/BaseButtonOrange.jsx";
import BaseButtonGray from "../buttons/BaseButtonGray.jsx";
import "./BaseModal.sass";

Modal.setAppElement("#root");
const BaseModalForRunBuild = (props) => {
  let [errorCommitHash, changeErrorCommitHash] = useState("");
  let [commitHash, changeCommitHash] = useState("");

  function chCommitHash(e) {
    //Очищаем ошибки при изменении input
    changeErrorCommitHash("");
    //Продолжаем делать свои дела
    changeCommitHash(e.currentTarget ? e.currentTarget.value : e);
    return e.currentTarget ? e.currentTarget.value : e;
  }

  function isInputValid() {
    let status = true;

    if (!commitHash.length) {
      changeErrorCommitHash("ERROR");
      status = false;
    }

    return status;
  }

  function postCommitHash() {
    if (isInputValid()) {
      console.log("ОтправОчка", commitHash);
      props.closeModal();
      changeCommitHash("");
    }
  }

  function onClick(){
    props.closeModal()
    changeErrorCommitHash("");
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "188px",
      maxWidth: "485px",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
      border: "0px",
      margin: "",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
    },
  };

  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <div className="base-modal__title">New Build</div>
        <div className="base-modal__subtitle">
          Enter the commit hash which you want to build
        </div>
        <BaseInput
          id="hash"
          placeholder="Commit hash"
          onChange={chCommitHash}
          classes="modal"
          value={commitHash}
          error={errorCommitHash}
        />
        <div className="page-settings__btns">
          <BaseButtonOrange text="Run build " onClick={postCommitHash} />
          <BaseButtonGray text="Cancel" onClick={onClick} />
        </div>
      </Modal>
    </>
  );
};
export default BaseModalForRunBuild;
