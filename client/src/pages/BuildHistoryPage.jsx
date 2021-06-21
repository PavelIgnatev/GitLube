import ClockLoader from 'react-spinners/FadeLoader';
import { useState, useEffect } from 'react';
import HistoryDashbpard from '../components/dashboard/HistoryDashbpard.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './BuildHistoryPage.sass';

const BuildsHistoryPage = () => {
  let [step, changeStep] = useState(9);
  const [appState, setAppState] = useState([]);
  const [color, setColor] = useState('#580b10');

  useEffect(() => {
    const apiUrl = '/api/builds';
    try {
      setTimeout(async () => {
        setAppState((await axios.get(apiUrl)).data);
      }, 500);
    } catch {
      setColor('#e74c3c');
      toast.error(`An error has occurred, please check your settings`);
    }
  }, [setAppState]);

  const css = {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div className="app-page__builds">
      <ClockLoader
        color={color}
        loading={!appState.length}
        css={css}
        size={50}
      />
      <ToastContainer />
      {appState
        .filter((_, index) => index < step)
        .map((item) => (
          <HistoryDashbpard item={item} key={item.id} />
        ))}
      {step < appState.length && (
        <button
          className="app-page__button base-button__gray"
          onClick={() => changeStep((step) => step + 9)}
        >
          Show more
        </button>
      )}
    </div>
  );
};
export default BuildsHistoryPage;
