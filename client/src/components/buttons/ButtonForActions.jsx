import "./ButtonForActions.sass";

const ButtonForActions = (props) => {
  return (
    <button className="button-action base-button__gray" onClick={props.onClick}>
      <div className="button-action__wrapper">
        <img
          className="button-action__img"
          src={require(`./../../assets/img/icons/${props.src}`).default}
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
