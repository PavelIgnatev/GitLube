import HistoryDashbpard from '../../dashboard/HistoryDashbpard';
import loader from '../../../assets/icons/loader.svg';
import Convert from 'ansi-to-html';
import { useEffect } from 'react';
import { builds, settings } from '../../../store';
import { observer } from 'mobx-react-lite';
import './BuildDetailsPage.sass';

const BuildDetaildsPage = () => {

  const buildId: string = window.location.pathname.split('/')[2];
  const convert = new Convert({ bg: '#f2f2f2', fg: '#55F' });

  function getDetails() {
    if (buildId) {
      if (!builds.getterBuildLog[buildId]) {
        builds.getBuildLog(buildId);
      }
      builds.getBuildInfo(buildId);
    }
  }

  useEffect(() => {
    getDetails();

    //Обновление state каждые n времени
    const interval = setInterval(
      () => {
        getDetails();
      },
      settings.settings.period > 0
        ? settings.settings.period * 1000 * 60
        : 1000 * 60
    );

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builds.status]);

  return (
    <div className="page-detail">
      {!builds.getterBuildLog[buildId] && (
        <object type="image/svg+xml" data={loader}>
          {' '}
        </object>
      )}
      {builds.getterBuildInfo[buildId] && (
        <HistoryDashbpard
          item={builds.getterBuildInfo[buildId]}
          key={builds.getterBuildInfo[buildId].id}
        />
      )}
      {builds.getterBuildLog[buildId] && (
        <pre
          className="page-detail__pre"
          dangerouslySetInnerHTML={{
            __html: convert.toHtml(builds.getterBuildLog[buildId]),
          }}
        ></pre>
      )}
    </div>
  );
};
export default observer(BuildDetaildsPage);
