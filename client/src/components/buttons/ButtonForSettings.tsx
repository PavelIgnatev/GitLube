import "./sass/ButtonForActions.sass";
import { NavLink } from "react-router-dom";
import { ButtonModel } from '../../@types/ButtonModel';

const ButtonForActions = (props: ButtonModel) => {
  return (
    <NavLink to="/settings" className={`button-action base-button__gray base-button__gray_${props.size}`}>
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
    </NavLink>
  );
};
export default ButtonForActions;
