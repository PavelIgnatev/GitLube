import PageRouter from '../router/PageRouter.jsx';
import BaseFooter from './footer/BaseFooter.jsx';
import BaseHeader from './header/BaseHeader.jsx';
function App() {
  return (
      <div className="app">
        <BaseHeader />
        <PageRouter />
        <BaseFooter />
      </div>
  );
}

export default App;
