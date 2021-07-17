import './BaseInput.sass';
import { InputModel } from '../../@types/InputModel';

const BaseInput = (props: InputModel) => {
  return (
    <div className="base-input">
      <label
        className="base-input__label"
        htmlFor={props.id}
        style={{ color: props.error ? 'red' : '' }}
      >
        {props.label}
        {props.required && (
          <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
        )}
      </label>
      <input
        className="base-input__input"
        type="text"
        id={props.id}
        autoComplete="off"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        style={{ border: props.error ? '2px solid red' : '' }}
        autoFocus={props.autoFocus}
      />
      {props.value && (
        <div
          className="base-input__clear"
          onClick={props.onClear}
        ></div>
      )}
    </div>
  );
};
export default BaseInput;
