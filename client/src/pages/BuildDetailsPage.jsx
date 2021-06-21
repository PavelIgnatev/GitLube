import HistoryDashbpard from "../components/dashboard/HistoryDashbpard.jsx";
import state from "../state";
import log from "../state/buildLog.js";
import "./BuildDetailsPage.sass";

const BuildDetaildsPage = () => {
  var Convert = require("ansi-to-html");
  var convert = new Convert();
  return (
    <div className="page-detail">
      <HistoryDashbpard item={state[9]} key={state[9].id} />
      <pre className="page-detail__pre">
        {convert.toHtml(log)}
      </pre>
    </div>
  )
};
export default BuildDetaildsPage;
