import ButtonForSettings from '../buttons/ButtonForSettings';
import ButtonForActions from '../buttons/ButtonForActions';
import BaseModalForRunBuild from '../../components/modal/BaseModalForRunBuild.jsx';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import './BaseHeader.sass';

const BaseHeader = (props) => {
  const history = useHistory();

  let [buttonDisabled, setButtonDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  async function postCommitHash() {
    try {
      setButtonDisabled(true)
      const apiUrl = history.location.pathname.replace('build', 'api/builds');
      const result = (await axios.get(apiUrl)).data;
      const { data } = await axios.post(`/api/builds/${result.commitHash}`);
      history.push('/build/' + data.buildId);
      setButtonDisabled(false)
    } catch (error) {
      setButtonDisabled(false)
      toast.error('Sorry! An error has occurred, please try to make a request manually');
    }
  }

  return (
    <>
      <header className="app-header">
        {/* path / */}
        <Route
          exact
          path="/"
          render={() =>
            !localStorage.getItem('Repository') ? (
              <>
                <NavLink to="/" className="app-header__icon">
                  School CI server
                </NavLink>
                <ButtonForSettings
                  action="Settings"
                  src="gear.svg"
                  size="big"
                />
              </>
            ) : (
              <>
                <BaseModalForRunBuild
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                />
                <div className="app-header__repo">
                  {localStorage.getItem('Repository')}
                </div>
                <div className="app-header__wrapper ">
                  <ButtonForActions
                    action="Run build"
                    src="play.svg"
                    size="big"
                    onClick={openModal}
                  />
                  <ButtonForSettings
                    action="Settings"
                    src="gear.svg"
                    size="mini"
                  />
                </div>
              </>
            )
          }
        ></Route>

        {/* path settings */}
        <Route
          exact
          path="/settings"
          render={() => (
            <NavLink to="/" className="app-header__icon">
              School CI server
            </NavLink>
          )}
        ></Route>

        {/* path build/:id */}
        <Route
          exact
          path="/build/:id"
          render={() => (
            <>
              <div className="app-header__repo">
                {localStorage.getItem('Repository')}
              </div>
              <div className="app-header__wrapper ">
                <ButtonForActions
                  action="Rebuild"
                  src="rebuild.svg"
                  size="big"
                  buttonDisabled={buttonDisabled}
                  onClick={postCommitHash}
                />
                <ButtonForSettings
                  action="Settings"
                  src="gear.svg"
                  size="mini"
                />
              </div>
            </>
          )}
        ></Route>
      </header>
      <ToastContainer />
    </>
  );
};
export default BaseHeader;
