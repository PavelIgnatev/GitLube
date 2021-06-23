import HistoryDashbpard from '../components/dashboard/HistoryDashbpard.jsx';
import ClockLoader from 'react-spinners/FadeLoader';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './BuildDetailsPage.sass';
import { toast } from 'react-toastify';

import Convert from 'ansi-to-html';
const BuildDetaildsPage = () => {
  const history = useHistory();

  const convert = new Convert();

  const [getLogs, setGetLogs] = useState('');
  const [getInfo, setGetInfo] = useState('');
  
  const [color, setColor] = useState('#2787f5');

  useEffect(() => {
    const apiUrl =
      history.location.pathname.replace('build', 'api/builds') + '/logs';

    (async () => {
      try {
        setGetLogs((await axios.get(apiUrl)).data);
      } catch {
        setColor('#e74c3c');
        toast.error(`An unknown error has occurred! Try again!`);
      }
    })();
    return null;
  }, [setGetLogs, history.location.pathname]);

  useEffect(() => {
    const apiUrl = history.location.pathname.replace('build', 'api/builds');

    (async () => {
      try {
        setGetInfo((await axios.get(apiUrl)).data);
      } catch {
        setColor('#e74c3c');
        toast.error(`An unknown error has occurred! Try again!`);
      }
    })();
    return null;
  }, [setGetInfo, history.location.pathname]);

  const css = {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
  function createMarkup() {
    return { __html: convert.toHtml(getLogs) };
  }
  return (
    <div className="page-detail">
      <ClockLoader
        color={color}
        loading={!getLogs.length}
        css={css}
        size={50}
      />
      {getInfo && <HistoryDashbpard item={getInfo} key={getInfo.id} />}
      {getLogs && (
        <pre
          className="page-detail__pre"
          dangerouslySetInnerHTML={createMarkup()}
        ></pre>
      )}
    </div>
  );
};
export default BuildDetaildsPage;
