import './BaseButton.sass'
const BaseButton = (props) => {
  return <button disabled={props.buttonDisabled} className="base-button base-button__gray" onClick={props.onClick}>{props.text}</button>;
};
export default BaseButton;
