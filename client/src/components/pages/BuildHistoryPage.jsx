import ClockLoader from 'react-spinners/FadeLoader';
import HistoryDashbpard from '../dashboard/HistoryDashbpard.jsx';
import { useState, useEffect } from 'react';
import { builds, settings } from '../../store';
import { observer } from 'mobx-react-lite';
import './BuildHistoryPage.sass';

const BuildsHistoryPage = () => {
  let [step, changeStep] = useState(9);

  useEffect(() => {
    //Получаем все билды в геттер getterBuildList, без ожидания
    builds.getBuildList();
    //Обновление state каждые n времени в настройках
    const update = setInterval(() => {
      builds.getBuildList();
    }, Number(settings.settings.period) > 0 ? Number(settings.settings.period) * 1000 * 60 : 1000 * 60);
    return () => {
      clearInterval(update);
    };
  }, []);

  return (
    <div className="app-page__builds">
      <ClockLoader
        color={'#2787f5'}
        loading={!builds.getterBuildList.length}
        size={50}
      />
      {builds.getterBuildList
        .filter((_, index) => index < step)
        .map((item) => (
          <HistoryDashbpard item={item} key={item.id} />
        ))}
      {step < builds.getterBuildList.length && (
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
export default observer(BuildsHistoryPage);
