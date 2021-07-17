import HistoryDashbpard from '../../dashboard/HistoryDashbpard';
import loader from '../../../assets/icons/loader.svg';
import Convert from 'ansi-to-html';
import { useEffect } from 'react';
import { builds, settings } from '../../../store';
import makeMobxLocation from 'mobx-location';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import './BuildDetailsPage.sass';

const BuildDetaildsPage = () => {
  const mobxLocation = makeMobxLocation({ arrayFormat: 'bracket' });
  const buildId = toJS(mobxLocation).href.split('/')[4];
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
      Number(settings.settings.period) > 0
        ? Number(settings.settings.period) * 1000 * 60
        : 1000 * 60
    );

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toJS(mobxLocation).href]);

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
            __html: convert.toHtml(builds.getterBuildLog[buildId], {
              colors: ['red'],
            }),
          }}
        ></pre>
      )}
    </div>
  );
};
export default observer(BuildDetaildsPage);
