import { Route } from 'react-router-dom';
import BuildDetaildsPage from '../components/pages/BuildDetailsPage.jsx';
import BuildsHistoryPage from '../components/pages/BuildHistoryPage.jsx';
import SettingsPage from '../components/pages/SettingsPage.jsx';
import StartScreenPage from '../components/pages/StartScreenPage.jsx';
import { observer } from 'mobx-react-lite';
import { settings } from '../store';

const RepoHeader = () => {
  const getter = settings.getterSettings
  return (
    <div className="app-page">
      <Route
        exact
        path="/"
        render={() =>
          getter.repoName ? (
            <BuildsHistoryPage />
          ) : (
            <StartScreenPage />
          )
        }
      ></Route>
      <Route exact path="/settings" component={SettingsPage}></Route>
      <Route exact path="/build/:number" component={BuildDetaildsPage}></Route>
    </div>
  );
};

export default observer(RepoHeader);
