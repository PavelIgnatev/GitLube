import { NavLink } from 'react-router-dom';
import './HistoryDashbpard.sass';
const historyDashboard = (props) => {
  //"status": "InProgress"
  //status": "Waiting"
  //"status": "Canceled",
  //"status": "Success",
  //"status": "Fail"

  function getDate(date) {
    return new Date(date).toLocaleString('en-US', {
      hour12: false,
      timeZone: 'Europe/Moscow',
      timeZoneName: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  function getTime(date) {
    const hours = Math.floor(Number(date) / 1000 / 60 / 60);
    return `${hours} h ${
      Math.floor(Number(date) / 1000 / 60) - hours * 60
    } min`;
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
              <div className="history-dashboard__commitHash">
                {String(props.item.commitHash).slice(0, 7)}
              </div>
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
            {(props.item.start || Number(props.item.duration) > -1) && (
              <div
                className="history-dashboard__lines"
                style={{ display: 'none' }}
              ></div>
            )}
            {(props.item.start || Number(props.item.duration) > -1) && (
              <div
                className="history-dashboard__lines_id"
                style={{ display: 'none' }}
              ></div>
            )}
          </div>
        </div>
      </div>
      {(props.item.start || Number(props.item.duration) > -1) && (
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
          {Number(props.item.duration) > -1 && (
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
