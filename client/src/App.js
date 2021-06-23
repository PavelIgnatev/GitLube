import { BrowserRouter } from 'react-router-dom';
import PageRouter from './router/PageRouter.jsx';
import BaseFooter from './components/footer/BaseFooter.jsx';
import BaseHeader from './components/header/BaseHeader.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <BaseHeader />
        <PageRouter />
        <BaseFooter />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
