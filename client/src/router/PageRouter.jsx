import { Route } from "react-router-dom";
import BuildDetaildsPage from "../pages/BuildDetailsPage.jsx";
import BuildsHistoryPage from "../pages/BuildHistoryPage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import StartScreenPage from "../pages/StartScreenPage.jsx";
import { Redirect } from "react-router-dom";

const RepoHeader = () => {
  return (
    <div className="app-page">
      <Route
        exact
        path="/"
        render={() =>
          localStorage.getItem("Repository") ? <BuildsHistoryPage /> : <StartScreenPage />
        }
      ></Route>
      <Route exact path="/settings" component={SettingsPage}></Route>
      <Route
        exact
        path="/build/:number"
        render={() =>
          localStorage.getItem("Repository") ? <BuildDetaildsPage /> : <Redirect to="/" />
        }
      ></Route>
    </div>
  );
};

export default RepoHeader;
