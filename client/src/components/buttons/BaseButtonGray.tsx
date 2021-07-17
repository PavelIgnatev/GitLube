import './sass/BaseButton.sass';
import { ButtonModel } from '../../@types/ButtonModel';

const BaseButton = (props: ButtonModel) => {
  return (
    <button
      disabled={props.buttonDisabled}
      className="base-button base-button__gray"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
export default BaseButton;
