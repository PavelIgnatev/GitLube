import ButtonForSettings from '../buttons/ButtonForSettings';
import ButtonForActions from '../buttons/ButtonForActions';
import BaseModalForRunBuild from '../modal/BaseModalForRunBuild';
import { builds, settings } from '../../store/index';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './BaseHeader.sass';

const BaseHeader = () => {
  const history = useHistory();
  const getter = settings.getterSettings;

  let [buttonDisabled, setButtonDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  let [redirect, setRedirect] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function postCommitHashForRebuild() {
    try {
      setButtonDisabled(true);
      const commitHash =
        builds.getterBuildInfo[history.location.pathname.split('/')[2]]
          .commitHash;

      const { data } = await builds.addQueueBuild(commitHash);
      setButtonDisabled(false);

      setRedirect('/build/' + data.buildId);
      builds.updateStatusPending('pending');
    } catch (error) {
      setButtonDisabled(false);
      toast.error(
        'The commit hash was not found in the repository from your settings'
      );
    }
  }

  return (
    <header className="app-header">
      {/* path / */}
      {settings.status !== 'pending' && (
        <Route
          exact
          path="/"
          render={() =>
            !getter.repoName ? (
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
                <div className="app-header__repo">{getter.repoName}</div>
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
      )}

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
            <NavLink to="/" className="app-header__repo">
              {getter.repoName}
            </NavLink>
            <div className="app-header__wrapper ">
              <ButtonForActions
                action="Rebuild"
                src="rebuild.svg"
                size="big"
                buttonDisabled={buttonDisabled}
                onClick={postCommitHashForRebuild}
              />
              {redirect && <Redirect to={redirect}></Redirect>}
              <ButtonForSettings action="Settings" src="gear.svg" size="mini" />
            </div>
          </>
        )}
      ></Route>
    </header>
  );
};
export default observer(BaseHeader);
