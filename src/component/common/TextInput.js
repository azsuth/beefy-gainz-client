import React from 'react';

import 'component/common/style/TextInput.scss';

const TextInput = ({
  value,
  onChange,
  onFocus,
  inputRef,
  type = 'text',
  theme = 'light',
  align
}) => (
  <span className={`TextInput TextInput--${theme}`}>
    <input
      className={`TextInput__input TextInput__input--align-${align}`}
      type={type}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      ref={inputRef}
    />
  </span>
);

export default TextInput;
