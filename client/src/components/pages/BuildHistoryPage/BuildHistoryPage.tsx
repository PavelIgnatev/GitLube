import loader from '../../../assets/icons/loader.svg';
import HistoryDashbpard from '../../dashboard/HistoryDashbpard';
import { useState, useEffect } from 'react';
import { builds, settings } from '../../../store';
import { observer } from 'mobx-react-lite';
import './BuildHistoryPage.sass';

const BuildsHistoryPage = () => {
  let [step, changeStep] = useState(9);

  useEffect(() => {

    //Получаем все билды в геттер getterBuildList, без ожидания
    builds.getBuildList();

    //Обновление state каждые n времени
    const update = setInterval(
      () => {
        builds.getBuildList();
      },
      Number(settings.settings.period) > 0
        ? Number(settings.settings.period) * 1000 * 60
        : 1000 * 60
    );
    return () => {
      clearInterval(update);
    };
  }, []);

  return (
    <div className="app-page__builds">
      {builds.status === 'no data' && (
        <div className="app-page__builds_sorry">
          Please add the build to the queue
        </div>
      )}
      {!builds.getterBuildList.length &&
        (builds.status === 'data' || builds.status === 'pending') && (
          <object type="image/svg+xml" data={loader}>
            {' '}
          </object>
        )}
      {builds.status === 'pending' && builds.getterBuildList.length > 0 && (
        <div style={{ position: 'relative' }}>
          <div style={{ opacity: '0' }}>
            <HistoryDashbpard item={{
              id: '',
              configurationId: '',
              buildNumber: 0,
              commitMessage: '',
              commitHash: '',
              branchName: '',
              authorName: '',
              status: '',
              start: '',
              duration: 0
            }} key={'buildstatuspending'} />
          </div>
          <object type="image/svg+xml" data={loader}>
            {' '}
          </object>
        </div>
      )}
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
