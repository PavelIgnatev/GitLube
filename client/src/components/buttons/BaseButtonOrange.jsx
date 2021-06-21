import "./BaseButton.sass";

const BaseButton = (props) => {
  return (
    <button
      className="base-button base-button__orange"
      disabled={props.buttonDisabled} 
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
export default BaseButton;
