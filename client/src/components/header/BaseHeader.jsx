import ButtonForSettings from "../buttons/ButtonForSettings";
import ButtonForActions from "../buttons/ButtonForActions";
import BaseModalForRunBuild from "../../components/modal/BaseModalForRunBuild.jsx";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Route } from "react-router-dom";
import "./BaseHeader.sass";

const BaseHeader = (props) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header className="app-header">
      {/* path / */}
      <Route
        exact
        path="/"
        render={() =>
          !localStorage.getItem("Repository") ? (
            <>
              <NavLink to="/" className="app-header__icon">
                School CI server
              </NavLink>
              <ButtonForSettings action="Settings" src="gear.svg" size="big" />
            </>
          ) : (
            <>
              <BaseModalForRunBuild
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
              />
              <div className="app-header__repo">
                {localStorage.getItem("Repository")}
              </div>
              <div className="app-header__wrapper ">
                <ButtonForActions
                  action="Run build"
                  src="play.svg"
                  size="big"
                  onClick={openModal}
                />
                <ButtonForSettings action="Settings" src="gear.svg" size="mini" />
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
              {localStorage.getItem("Repository")}
            </div>
            <div className="app-header__wrapper ">
              <ButtonForActions
                action="Rebuild"
                src="rebuild.svg"
                size="big"
              />
              <ButtonForSettings action="Settings" src="gear.svg" size="mini" />
            </div>
          </>
        )}
      ></Route>
    </header>
  );
};
export default BaseHeader;
