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
        toast.error(
          'The commit hash was not found in the repository from your settings'
        );
      }
    }
  }

  function onClick() {
    props.closeModal();
    changeErrorCommitHash('');
    changeCommitHash('');
  }

  return (
    <Modal isOpen={props.modalIsOpen} onRequestClose={onClick}>
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
  );
};
export default BaseModalForRunBuild;
