import React from 'react';

import 'component/common/style/TextInput.scss';

const TextInput = ({ value, onChange, onFocus, repsInputRef }) => (
  <div className="TextInput">
    <input
      className="TextInput__input"
      type="text"
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      ref={repsInputRef}
    />
  </div>
);

export default TextInput;
