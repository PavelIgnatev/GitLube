import { Route } from 'react-router-dom';
import BuildDetaildsPage from '../components/pages/BuildDetailsPage/BuildDetailsPage.jsx';
import BuildsHistoryPage from '../components/pages/BuildHistoryPage/BuildHistoryPage.jsx';
import SettingsPage from '../components/pages/SettingsPage/SettingsPage.jsx';
import StartScreenPage from '../components/pages/StartScreenPage/StartScreenPage.jsx';
import { observer } from 'mobx-react-lite';
import { settings } from '../store';

const RepoHeader = () => {
  const getter = settings.getterSettings;
  return (
    <div className="app-page">
      {settings.status !== 'pending' && (
        <Route
          exact
          path="/"
          render={() =>
            getter.repoName ? <BuildsHistoryPage /> : <StartScreenPage />
          }
        ></Route>
      )}
      <Route exact path="/settings" component={SettingsPage}></Route>
      <Route exact path="/build/:number" component={BuildDetaildsPage}></Route>
    </div>
  );
};

export default observer(RepoHeader);
