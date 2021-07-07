import Modal from 'react-modal';
import { useState } from 'react';
import BaseInput from '../inputs/BaseInput.jsx';
import BaseButtonOrange from '../buttons/BaseButtonOrange.jsx';
import BaseButtonGray from '../buttons/BaseButtonGray.jsx';
import { toast } from 'react-toastify';
import { builds } from '../../store/index.js';
import './BaseModal.sass';
import { Redirect } from 'react-router';

Modal.setAppElement('#root');
const BaseModalForRunBuild = (props) => {
  let [errorCommitHash, changeErrorCommitHash] = useState('');
  let [commitHash, changeCommitHash] = useState('');
  let [buttonDisabled, setButtonDisabled] = useState(false);
  let [redirect, setRedirect] = useState(false);

  function minimalValid() {
    let status = true;

    if (commitHash.length < 7) {
      changeErrorCommitHash('ERROR');

      toast.error('The minimum length of the commit hash field is 7 character');
      status = false;
    }
    return status;
  }

  async function postCommitHash(e) {
    e.preventDefault();
    if (minimalValid() !== false) {
      try {
        setButtonDisabled(true);

        const { data } = await builds.addQueueBuild(commitHash);

        setButtonDisabled(false);
        dischargeModal();

        setRedirect('/build/' + data.buildId);
        builds.updateStatusPending('pending');
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
      {redirect}
      {redirect && <Redirect to={redirect}></Redirect>}
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
          autoFocus={true}
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
