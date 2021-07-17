import PageRouter from '../router/PageRouter';
import BaseFooter from './footer/BaseFooter';
import BaseHeader from './header/BaseHeader';
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
