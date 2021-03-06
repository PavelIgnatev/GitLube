import { NavLink } from 'react-router-dom';
import './HistoryDashbpard.sass';
import { BuildModelForItem } from '../../@types/BuildModel/BuildModelForItem';

const historyDashboard = (props: BuildModelForItem) => {
  //"status": "InProgress"
  //status": "Waiting"
  //"status": "Canceled",
  //"status": "Success",
  //"status": "Fail"


  function getDate(date: string): string {
    return new Date(date).toLocaleString('en-US', {
      hour12: false,
      timeZone: 'Europe/Moscow',

      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  function getTime(date: number): string {
    const hours = Math.floor(date / 1000 / 60 / 60);
    const minutes = Math.floor((date / (1000 * 60)) % 60)
    const seconds = Math.floor((date / 1000) % 60);
    return `${hours} h ${minutes} min ${seconds} sec`;
  }

  return (
    <NavLink
      className={`history-dashboard history-dashboard__${props.item.status}`}
      to={`/build/${props.item.id}`}
    >
      <div style={{ display: 'flex', flex: 1 }}>
        <div
          className={`history-dashboard__status history-dashboard__status_${props.item.status}`}
        ></div>
        <div className="history-dashboard__description">
          <div className="history-dashboard__line">
            <div className="history-dashboard__number">
              #{props.item.buildNumber}
            </div>
            <div className="history-dashboard__header">
              {props.item.commitMessage}
            </div>
          </div>
          <div className="history-dashboard__line">
            <div style={{ display: 'flex' }}>
              <img
                className="history-dashboard__branchName_img"
                src={require(`./../../assets/icons/code-commit.svg`).default}
                alt="code-commit"
              />
              <div className="history-dashboard__branchName">
                {props.item.branchName}
              </div>
              {props.item.commitHash && <div className="history-dashboard__commitHash">
                {props.item.commitHash.slice(0, 7)}
              </div>}

            </div>
            <div style={{ display: 'flex' }}>
              <img
                className="history-dashboard__name_img"
                src={require(`./../../assets/icons/user.svg`).default}
                alt=""
              />
              <div className="history-dashboard__name">
                {props.item.authorName}
              </div>
            </div>
            {(props.item.start || props.item.duration > -1) && (
              <div
                className="history-dashboard__lines"
                style={{ display: 'none' }}
              ></div>
            )}
            {(props.item.start || props.item.duration > -1) && (
              <div
                className="history-dashboard__lines_id"
                style={{ display: 'none' }}
              ></div>
            )}
          </div>
        </div>
      </div>
      {(props.item.start || props.item.duration > -1) && (
        <div className="history-dashboard__info">
          {props.item.start && (
            <div className="history-dashboard__line">
              <img
                className="history-dashboard__calendar"
                src={require(`./../../assets/icons/calendar.svg`).default}
                alt=""
              />
              <div className="history-dashboard__date">
                {getDate(props.item.start)}
              </div>
            </div>
          )}
          {props.item.duration > -1 && (
            <div className="history-dashboard__line">
              <img
                className="history-dashboard__clock"
                src={require(`./../../assets/icons/clock.svg`).default}
                alt=""
              />
              <div className="history-dashboard__time">
                {getTime(props.item.duration)}
              </div>
            </div>
          )}
        </div>
      )}
    </NavLink>
  );
};

export default historyDashboard;
