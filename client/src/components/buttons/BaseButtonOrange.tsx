import "./sass/BaseButton.sass";
import { ButtonModel } from '../../@types/ButtonModel';

const BaseButton = (props: ButtonModel) => {
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
