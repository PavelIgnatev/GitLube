import { BrowserRouter } from 'react-router-dom';
import PageRouter from './router/PageRouter.jsx';
import BaseFooter from './components/footer/BaseFooter.jsx';
import BaseHeader from './components/header/BaseHeader.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
