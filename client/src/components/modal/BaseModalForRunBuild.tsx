import Modal from 'react-modal';
import { useState } from 'react';
import BaseInput from '../inputs/BaseInput';
import BaseButtonOrange from '../buttons/BaseButtonOrange';
import BaseButtonGray from '../buttons/BaseButtonGray';
import { toast } from 'react-toastify';
import { builds } from '../../store/index';
import './BaseModal.sass';
import { Redirect } from 'react-router';

Modal.setAppElement('#root');

const BaseModalForRunBuild = (props: { closeModal: Function, modalIsOpen: boolean }) => {

  let [errorCommitHash, changeErrorCommitHash] = useState(false);
  let [commitHash, changeCommitHash] = useState('');
  let [buttonDisabled, setButtonDisabled] = useState(false);
  let [redirect, setRedirect] = useState('');

  function minimalValid() {
    let status: boolean = true;

    if (commitHash.length < 7) {
      changeErrorCommitHash(true);

      toast.error('The minimum length of the commit hash field is 7 character');
      status = false;
    }
    return status;
  }

  async function postCommitHash(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (minimalValid() !== false) {
      try {
        setButtonDisabled(true);

        const { data }: { data: { buildId: string } } = await builds.addQueueBuild(commitHash);

        setButtonDisabled(false);

        builds.updateStatusPending();
        setRedirect(`/build/${data.buildId}`);
        dischargeModal();
      } catch (error) {
        setButtonDisabled(false);
        changeErrorCommitHash(true);
        toast.error(
          'The commit hash was not found in the repository from your settings'
        );
      }
    }
  }
  //сброс модального окна
  function dischargeModal() {
    props.closeModal();
    changeErrorCommitHash(false);
    changeCommitHash('');
  }

  return (
    <>
      {redirect && props.modalIsOpen && builds.status === 'pending' && (
        <Redirect to={redirect}></Redirect>
      )}
      <Modal isOpen={props.modalIsOpen} onRequestClose={dischargeModal}>
        <form>
          <div className="base-modal__title">New Build</div>
          <div className="base-modal__subtitle">
            Enter the commit hash which you want to build
          </div>
          <BaseInput
            id="hash"
            placeholder="Commit hash"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              changeCommitHash(e.currentTarget.value.trim());
              changeErrorCommitHash(false);
            }}
            onClear={() => {
              changeCommitHash('');
              changeErrorCommitHash(false);
            }}
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
    </>
  );
};
export default BaseModalForRunBuild;
