import { Route, Switch } from 'react-router-dom';
import BuildDetaildsPage from '../components/pages/BuildDetailsPage/BuildDetailsPage.jsx';
import BuildsHistoryPage from '../components/pages/BuildHistoryPage/BuildHistoryPage.jsx';
import SettingsPage from '../components/pages/SettingsPage/SettingsPage.jsx';
import StartScreenPage from '../components/pages/StartScreenPage/StartScreenPage.jsx';
import PageNotFound from '../components/pages/PageNotFound/PageNotFound.jsx';
import { observer } from 'mobx-react-lite';
import { settings, builds } from '../store';
import { Redirect } from 'react-router';

const RepoHeader = () => {
  const getter = settings.getterSettings;
  return (
    <div className="app-page">
      <Switch>
        {(builds.BuildInfoError ||
          builds.buildLogError ||
          builds.buildListError ||
          settings.settingsErorr) && <Redirect to="/page-not-found"></Redirect>}
        {settings.status === 'done' && (
          <Route
            exact
            path="/"
            render={() =>
              getter.repoName ? <BuildsHistoryPage /> : <StartScreenPage />
            }
          ></Route>
        )}
        <Route exact path="/"></Route>
        <Route exact path="/settings" component={SettingsPage}></Route>
        <Route
          exact
          path="/build/:number"
          component={BuildDetaildsPage}
        ></Route>
        <Route exact component={PageNotFound}></Route>
      </Switch>
    </div>
  );
};

export default observer(RepoHeader);
