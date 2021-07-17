import "./sass/ButtonForActions.sass";
import { ButtonModel } from '../../@types/ButtonModel';

const ButtonForActions = (props: ButtonModel) => {
  return (
    <button disabled={props.buttonDisabled} className="button-action base-button__gray" onClick={props.onClick}>
      <div className="button-action__wrapper">
        <img
          className="button-action__img"
          src={require(`./../../assets/icons/${props.src}`).default}
          alt=""
        />
      </div>
      {props.size === "big" && (
        <div className="button-action__action">{props.action}</div>
      )}
    </button>
  );
};
export default ButtonForActions;
