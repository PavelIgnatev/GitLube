import './BaseInput.sass';

const BaseInput = (props) => {
  return (
    <div className="base-input">
      <label
        className="base-input__label"
        htmlFor={props.id}
        style={{ color: props.error ? 'red' : '' }}
      >
        {props.label}
        {props.required === 'true' && (
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
      />
      {props.value && (
        <div
          className="base-input__clear"
          onClick={() => props.onChange({ currentTarget: { value: '' } })}
        ></div>
      )}
    </div>
  );
};
export default BaseInput;
