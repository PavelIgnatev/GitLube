import Modal from 'react-modal';
import { useState } from 'react';
import BaseInput from '../inputs/BaseInput.jsx';
import BaseButtonOrange from '../buttons/BaseButtonOrange.jsx';
import BaseButtonGray from '../buttons/BaseButtonGray.jsx';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { builds } from '../../store/index.js';
import './BaseModal.sass';

Modal.setAppElement('#root');
const BaseModalForRunBuild = (props) => {
  const history = useHistory();

  let [errorCommitHash, changeErrorCommitHash] = useState('');
  let [commitHash, changeCommitHash] = useState('');
  let [buttonDisabled, setButtonDisabled] = useState(false);

  function minimalValid() {
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
    if (minimalValid()) {
      try {
        setButtonDisabled(true);
        const { data } = await builds.addQueueBuild(commitHash);
        setButtonDisabled(false);

        dischargeModal();
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
  //сброс модального окна
  function dischargeModal() {
    props.closeModal();
    changeErrorCommitHash('');
    changeCommitHash('');
  }

  return (
    <Modal isOpen={props.modalIsOpen} onRequestClose={dischargeModal}>
      <form>
        <div className="base-modal__title">New Build</div>
        <div className="base-modal__subtitle">
          Enter the commit hash which you want to build
        </div>
        <BaseInput
          id="hash"
          placeholder="Commit hash"
          onChange={(e) => {
            changeCommitHash(e.currentTarget.value.trim());
            changeErrorCommitHash('');
          }}
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
            onClick={dischargeModal}
          />
        </div>
      </form>
    </Modal>
  );
};
export default BaseModalForRunBuild;
