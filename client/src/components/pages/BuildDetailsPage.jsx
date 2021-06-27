import HistoryDashbpard from '../dashboard/HistoryDashbpard.jsx';
import loader from '../../assets/icons/loader.svg';
import Convert from 'ansi-to-html';
import { useEffect } from 'react';
import { builds, settings } from '../../store';
import makeMobxLocation from 'mobx-location';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import './BuildDetailsPage.sass';

const BuildDetaildsPage = () => {
  const mobxLocation = makeMobxLocation({ arrayFormat: 'bracket' });
  const buildId = toJS(mobxLocation).href.split('/').pop();
  const convert = new Convert();

  function getDetails() {
    if (buildId) {
      builds.getBuildLog(buildId);
      builds.getBuildInfo(buildId);
    }
  }

  useEffect(() => {
    let update = '';
    //Не делаем лишний запрос, если у нас на клиенте уже имеются данные для нужного buildId
    //await не нужен, данные придут в getter
    if (!builds.getterBuildLog[buildId]) {
      getDetails();

      //Обновление state каждые n времени в настройках
      update = setInterval(
        () => {
          getDetails();
        },
        Number(settings.settings.period) > 0
          ? Number(settings.settings.period) * 1000 * 60
          : 1000 * 60
      );
    }
    return () => {
      clearInterval(update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toJS(mobxLocation).href]);

  return (
    <div className="page-detail">
      {!builds.getterBuildLog[buildId] && (
          <object type="image/svg+xml" data={loader}>
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
            __html: convert.toHtml(
              builds.getterBuildLog[toJS(mobxLocation).href.split('/').pop()],
              {
                colors: ['red'],
              }
            ),
          }}
        ></pre>
      )}
    </div>
  );
};
export default observer(BuildDetaildsPage);
