import PageRouter from '../router/PageRouter.jsx';
import BaseFooter from './footer/BaseFooter.jsx';
import BaseHeader from './header/BaseHeader.jsx';
import { settings } from '../store/index';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    settings.getSettings();
  }, []);
  return (
    <div className="app">
      <BaseHeader />
      <PageRouter />
      <BaseFooter />
    </div>
  );
}

export default App;
