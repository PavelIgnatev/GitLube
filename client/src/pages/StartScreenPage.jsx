import "./StartScreenPage.sass";
import keyandscrewdriver from "../assets/img/icons/keyandscrewdriver.svg";
import BaseButtonOrange from "../components/buttons/BaseButtonOrange.jsx";
import { useHistory } from "react-router-dom";

const StartScreenPage = () => {
  let history = useHistory();

  function RedirectToBuildHistory() {
    history.push("/settings");
  }

  return (
    <div className="page-start">
      <img className="page-start__img" src={keyandscrewdriver} alt="" />
      <div className="page-start__subtitle">
        Configure repository connection and synchronization settings
      </div>
      <BaseButtonOrange onClick={RedirectToBuildHistory} text="Open settings" />
    </div>
  );
};
export default StartScreenPage;
