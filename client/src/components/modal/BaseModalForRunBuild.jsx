import Modal from 'react-modal';
import { useState } from 'react';
import BaseInput from '../inputs/BaseInput.jsx';
import BaseButtonOrange from '../buttons/BaseButtonOrange.jsx';
import BaseButtonGray from '../buttons/BaseButtonGray.jsx';
import axios from 'axios';
import './BaseModal.sass';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

Modal.setAppElement('#root');
const BaseModalForRunBuild = (props) => {
  const history = useHistory();

  let [errorCommitHash, changeErrorCommitHash] = useState('');
  let [commitHash, changeCommitHash] = useState('');
  let [buttonDisabled, setButtonDisabled] = useState(false);

  function chCommitHash(e) {
    //Очищаем ошибки при изменении input
    changeErrorCommitHash('');
    //Продолжаем делать свои дела
    changeCommitHash(e.currentTarget ? e.currentTarget.value : e);
    return e.currentTarget ? e.currentTarget.value : e;
  }

  function isInputValid() {
    let status = true;

    if (!commitHash.length) {
      changeErrorCommitHash('ERROR');
      status = false;
    }
    if (errorCommitHash) {
      status = false;
    }

    return status;
  }

  async function postCommitHash() {
    if (isInputValid()) {
      try {
        setButtonDisabled(true);
        const { data } = await axios.post(`/api/builds/${commitHash}`);
        setButtonDisabled(false);
        props.closeModal();
        changeCommitHash('');
        history.push('/build/' + data.buildId);
      } catch (error) {
        setButtonDisabled(false);
        changeErrorCommitHash('Error');
        toast.error('Commit hash not found');
      }
    }
  }

  function onClick() {
    props.closeModal();
    changeErrorCommitHash('');
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      height: '188px',
      maxWidth: '485px',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      border: '0px',
      margin: '',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
    },
  };

  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <form>
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
            <BaseButtonOrange
              text="Run build"
              buttonDisabled={buttonDisabled}
              onClick={postCommitHash}
            />
            <BaseButtonGray
              text="Cancel"
              buttonDisabled={buttonDisabled}
              onClick={onClick}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
export default BaseModalForRunBuild;
